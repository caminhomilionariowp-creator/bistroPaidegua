/* ================================================================== */
/*  Fotos reais do Bistrô — guardadas no navegador (localStorage).      */
/*  Redimensiona no upload pra caber. Chave por prato/foto.             */
/* ================================================================== */

const KEY = 'bistro_pai_degua_fotos_v1';

type PhotoStore = Record<string, string>; // chave -> data URI (jpeg)

const read = (): PhotoStore => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

export const getPhoto = (key: string): string | undefined => read()[key];

export const setPhoto = (key: string, dataUri: string): void => {
  const store = read();
  store[key] = dataUri;
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    throw new Error(
      'Armazenamento de fotos cheio. Remova fotos antigas antes de adicionar novas.',
    );
  }
};

export const removePhoto = (key: string): void => {
  const store = read();
  delete store[key];
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* ignore */
  }
};

export const photoStorageInfo = (): { count: number; kb: number } => {
  const raw = localStorage.getItem(KEY) || '{}';
  let count = 0;
  try {
    count = Object.keys(JSON.parse(raw)).length;
  } catch {
    /* ignore */
  }
  return { count, kb: Math.round((raw.length * 2) / 1024) };
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
