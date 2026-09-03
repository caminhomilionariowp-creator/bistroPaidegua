import React, { useState } from 'react';
import { Delete, ArrowLeft, ShieldCheck, Users } from 'lucide-react';
import { EmployeeAccount } from '../types';
import { CharacterAvatar } from './Characters';
import { BrandLogo } from './BrandLogo';
import { todayScheduleLabel } from '../data/scheduleData';

interface LoginPageProps {
  employees: EmployeeAccount[];
  onLogin: (emp: EmployeeAccount) => void;
  onOpenTeam?: () => void;
}

const SECTOR_STYLE: Record<string, string> = {
  cozinha: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  estoque: 'bg-amber-100 text-amber-800 border-amber-300',
  salao: 'bg-rose-100 text-rose-800 border-rose-300',
  caixa: 'bg-blue-100 text-blue-800 border-blue-300',
  gerencia: 'bg-purple-100 text-purple-800 border-purple-300',
};

export const LoginPage: React.FC<LoginPageProps> = ({ employees, onLogin, onOpenTeam }) => {
  const [picked, setPicked] = useState<EmployeeAccount | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [tries, setTries] = useState(0);

  const active = employees.filter((e) => e.active !== false);

  const press = (d: string) => {
    if (pin.length >= 4 || !picked) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === picked.pin) {
        onLogin(picked);
      } else {
        setError(true);
        setTries((t) => t + 1);
        setTimeout(() => setPin(''), 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* brilho de fundo marajoara */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-white/95 rounded-2xl p-3 shadow-lg border border-white/20">
            <BrandLogo variant="full" size="lg" />
          </div>
          <p className="mt-3 text-xs font-mono uppercase tracking-widest text-amber-400">
            Acesso ao Sistema Operacional
          </p>
          <p className="text-[11px] text-stone-400 mt-1">🕒 {todayScheduleLabel()}</p>
        </div>

        {!picked ? (
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              <Users className="w-4 h-4" /> Quem está entrando?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[46vh] overflow-y-auto pr-1">
              {active.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => {
                    setPicked(emp);
                    setPin('');
                    setError(false);
                    setTries(0);
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/70 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500/60 transition-all text-left cursor-pointer"
                >
                  <CharacterAvatar id={emp.photoUrl || 'chef_manel'} size="md" customUrl={emp.photoUrl} />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-white truncate">{emp.name}</p>
                    <p className="text-[11px] text-stone-400 truncate">{emp.role}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          SECTOR_STYLE[emp.primarySector] || SECTOR_STYLE.gerencia
                        }`}
                      >
                        {emp.primarySector.toUpperCase()}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500">Crachá {emp.badgeNumber}</span>
                      {(emp.isManager || emp.primarySector === 'gerencia') && (
                        <ShieldCheck className="w-3 h-3 text-purple-400" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {onOpenTeam && (
              <p className="text-center text-[11px] text-stone-500 mt-3">
                Novo funcionário? A gestão cadastra em <strong>Equipe & Acessos</strong> depois de entrar.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 backdrop-blur-xs">
            <button
              onClick={() => {
                setPicked(null);
                setPin('');
                setError(false);
              }}
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> trocar de pessoa
            </button>

            <div className="flex flex-col items-center text-center">
              <CharacterAvatar id={picked.photoUrl || 'chef_manel'} size="xl" customUrl={picked.photoUrl} />
              <p className="font-black text-lg text-white mt-2">{picked.name}</p>
              <p className="text-xs text-stone-400">{picked.role}</p>

              <div className={`flex gap-2.5 my-5 ${error ? 'animate-shake' : ''}`}>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                      error
                        ? 'border-rose-500 bg-rose-500'
                        : pin.length > i
                          ? 'border-emerald-400 bg-emerald-400'
                          : 'border-stone-600'
                    }`}
                  />
                ))}
              </div>
              {error && (
                <p className="text-xs text-rose-400 font-bold -mt-3 mb-2">
                  PIN incorreto{tries >= 3 ? ' — confirme com a gestão' : ''}
                </p>
              )}

              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[240px]">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
                  <button
                    key={n}
                    onClick={() => press(n)}
                    className="h-14 rounded-xl bg-stone-800 hover:bg-stone-700 active:bg-emerald-700 text-xl font-bold text-white transition-colors cursor-pointer"
                  >
                    {n}
                  </button>
                ))}
                <span />
                <button
                  onClick={() => press('0')}
                  className="h-14 rounded-xl bg-stone-800 hover:bg-stone-700 active:bg-emerald-700 text-xl font-bold text-white transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={() => setPin((p) => p.slice(0, -1))}
                  className="h-14 rounded-xl bg-stone-800/60 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-stone-600 mt-4 font-mono">PIN de 4 dígitos • fim do login genérico por setor</p>
            </div>
          </div>
        )}

        <p className="text-center text-[10px] text-stone-600 mt-5 font-mono">
          Bistrô Pai d'Égua • Sistema Operacional v1.1
        </p>
      </div>
    </div>
  );
};
