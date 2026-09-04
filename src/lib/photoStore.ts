/* ================================================================== */
/*  Fotos reais do Bistrô.                                             */
/*  - Com backend: a imagem vai pro Supabase Storage (bucket "fotos")  */
/*    e o índice guarda a URL pública (sincroniza entre aparelhos).    */
/*  - Sem backend: o índice guarda o próprio data URI (só no aparelho).*/
/*  Um cache local guarda o data URI pra abrir na hora / offline.      */
/* ================================================================== */
import { backendEnabled, uploadPhoto, deletePhotoRemote } from './db';

const INDEX_KEY = 'bistro_pai_degua_fotos_v2'; // sincronizado (ver SYNCED_KEYS)
const CACHE_KEY = 'bistro_pai_degua_fotos_cache_v1'; // só local
const LEGACY_KEY = 'bistro_pai_degua_fotos_v1'; // versão antiga (base64 local)

type Store = Record<string, string>;

const read = (key: string): Store => {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
};
const write = (key: string, store: Store) => {
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch {
    throw new Error('Armazenamento cheio. Remova fotos antigas antes de adicionar novas.');
  }
};

/* ---------- observers ---------- */
const listeners = new Set<() => void>();
export const subscribePhotos = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const emit = () => listeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  window.addEventListener('bistro:sync', (e) => {
    if ((e as CustomEvent).detail?.key === INDEX_KEY) emit();
  });
}

/* ---------- leitura ---------- */
export const getPhoto = (key: string): string | undefined => {
  const idx = read(INDEX_KEY)[key];
  if (idx) return idx;
  const cached = read(CACHE_KEY)[key];
  if (cached) return cached;
  return read(LEGACY_KEY)[key];
};

/** Caminho do arquivo no bucket a partir da chave da foto. */
const storagePath = (key: string) => `${key.replace(/[^a-zA-Z0-9._-]/g, '_')}.jpg`;

/* ---------- escrita ---------- */
/** Grava a foto (data URI). Local na hora; sobe pro Storage em segundo plano. */
export const setPhoto = (key: string, dataUri: string): void => {
  const cache = read(CACHE_KEY);
  cache[key] = dataUri;
  write(CACHE_KEY, cache);

  const setIndex = (value: string) => {
    const now = read(INDEX_KEY);
    now[key] = value;
    write(INDEX_KEY, now);
    emit();
  };

  if (!backendEnabled) {
    setIndex(dataUri); // sem nuvem: a referência é o próprio data URI (só neste aparelho)
    return;
  }

  // Com nuvem: NÃO joga base64 no índice sincronizado — só a URL depois do upload.
  emit(); // já mostra do cache local
  uploadPhoto(storagePath(key), dataUri)
    .then((url) => setIndex(url || dataUri))
    .catch(() => setIndex(dataUri));
};

export const removePhoto = (key: string): void => {
  for (const k of [INDEX_KEY, CACHE_KEY, LEGACY_KEY]) {
    const s = read(k);
    if (k in s || key in s) {
      delete s[key];
      try {
        write(k, s);
      } catch {
        /* ignore */
      }
    }
  }
  emit();
  if (backendEnabled) deletePhotoRemote(storagePath(key));
};

export const photoStorageInfo = (): { count: number; kb: number } => {
  const raw =
    (localStorage.getItem(INDEX_KEY) || '{}').length + (localStorage.getItem(CACHE_KEY) || '{}').length;
  let count = 0;
  try {
    count = Object.keys(read(INDEX_KEY)).length;
  } catch {
    /* ignore */
  }
  return { count, kb: Math.round((raw * 2) / 1024) };
};

/** Lê um arquivo de imagem e devolve um data URI JPEG redimensionado. */
export const fileToResizedDataUri = (
  file: File,
  maxDimension = 1280,
  quality = 0.82,
): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('O arquivo precisa ser uma imagem (JPG ou PNG).'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não consegui ler o arquivo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Imagem inválida ou corrompida.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          const r = Math.min(maxDimension / width, maxDimension / height);
          width = Math.round(width * r);
          height = Math.round(height * r);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Falha ao processar a imagem.'));
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
