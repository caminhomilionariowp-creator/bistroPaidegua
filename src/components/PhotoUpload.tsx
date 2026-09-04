import React, { useRef, useState, useSyncExternalStore } from 'react';
import { Camera, Upload, Trash2, Edit3, RefreshCw } from 'lucide-react';
import {
  getPhoto,
  setPhoto,
  removePhoto,
  fileToResizedDataUri,
  subscribePhotos,
} from '../lib/photoStore';

interface PhotoUploadProps {
  /** chave única da foto, ex.: "recipe:rec-tacaca" */
  photoKey: string;
  label?: string;
  /** proporção do quadro */
  ratio?: 'wide' | 'square' | 'tall';
  /** rótulo pequeno mostrado no rodapé do quadro */
  caption?: string;
  /** abre o Estúdio de Ilustração para anotar a foto */
  onAnnotate?: () => void;
  className?: string;
}

const RATIO_H: Record<string, string> = {
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
};

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photoKey,
  label = 'Foto real',
  ratio = 'wide',
  caption,
  onAnnotate,
  className = '',
}) => {
  const photo = useSyncExternalStore(
    subscribePhotos,
    () => getPhoto(photoKey),
    () => undefined,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const dataUri = await fileToResizedDataUri(file);
      setPhoto(photoKey, dataUri);
    } catch (e: any) {
      setError(e?.message || 'Falha ao salvar a foto.');
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    removePhoto(photoKey);
    setError(null);
  };

  return (
    <div className={className}>
      {label && (
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 bg-stone-100 px-3 py-1 rounded mb-2">
          {label}
        </h3>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {photo ? (
        <div className={`relative ${RATIO_H[ratio]} rounded-lg overflow-hidden border-2 border-stone-300 group bg-stone-100`}>
          <img src={photo} alt={label} className="w-full h-full object-cover" />
          <div className="no-print absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => fileRef.current?.click()}
              className="text-[11px] font-bold bg-white text-stone-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-stone-100 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Trocar
            </button>
            {onAnnotate && (
              <button
                onClick={onAnnotate}
                className="text-[11px] font-bold bg-stone-900 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-stone-800 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" /> Anotar
              </button>
            )}
            <button
              onClick={clear}
              className="text-[11px] font-bold bg-rose-600 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-rose-700 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Remover
            </button>
          </div>
          {caption && (
            <span className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-[10px] px-2 py-1 font-medium">
              {caption}
            </span>
          )}
        </div>
      ) : (
        <div
          className={`${RATIO_H[ratio]} rounded-lg border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-stone-100 flex flex-col items-center justify-center p-3 text-center gap-2`}
        >
          <Camera className="w-8 h-8 text-amber-500" />
          <span className="text-[11px] font-bold text-stone-700">
            {busy ? 'Salvando…' : 'Sem foto ainda'}
          </span>
          {caption && <span className="text-[10px] text-stone-500 leading-tight">{caption}</span>}
          <div className="no-print flex flex-wrap items-center justify-center gap-1.5 mt-1">
            <button
              onClick={() => cameraRef.current?.click()}
              disabled={busy}
              className="text-[10px] font-bold bg-stone-900 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
            >
              <Camera className="w-3 h-3" /> Tirar foto
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="text-[10px] font-bold bg-white text-stone-800 border border-stone-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1 hover:bg-stone-100 disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-3 h-3" /> Da galeria
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-[10px] text-rose-600 mt-1.5 leading-tight">{error}</p>}
    </div>
  );
};
