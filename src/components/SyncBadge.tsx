import React, { useEffect, useState } from 'react';
import { Cloud, CloudOff, RefreshCw } from 'lucide-react';
import { subscribeSyncStatus, backendEnabled } from '../lib/db';

export const SyncBadge: React.FC = () => {
  const [status, setStatus] = useState<'desligado' | 'conectando' | 'ok' | 'offline'>('conectando');

  useEffect(() => subscribeSyncStatus(setStatus), []);

  if (!backendEnabled || status === 'desligado') return null;

  const map = {
    conectando: { icon: RefreshCw, cls: 'text-stone-400', label: 'sincronizando…', spin: true },
    ok: { icon: Cloud, cls: 'text-emerald-500', label: 'sincronizado', spin: false },
    offline: { icon: CloudOff, cls: 'text-amber-500', label: 'offline — salvo no aparelho', spin: false },
  } as const;
  const m = map[status as keyof typeof map] || map.conectando;
  const Icon = m.icon;

  return (
    <div
      className="no-print fixed bottom-4 left-4 z-40 flex items-center gap-1.5 bg-stone-900/90 text-stone-200 border border-stone-700 rounded-full pl-2 pr-3 py-1.5 text-[11px] font-bold shadow-lg"
      title="Estado da sincronização com a nuvem"
    >
      <Icon className={`w-3.5 h-3.5 ${m.cls} ${m.spin ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">{m.label}</span>
    </div>
  );
};
