import React from 'react';

interface CharacterAvatarProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  customUrl?: string;
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  id = 'chef_manel',
  size = 'md',
  customUrl,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
    giant: 'w-32 h-32 text-xl'
  }[size];

  if (customUrl && customUrl.startsWith('data:image')) {
    return (
      <div className={`relative rounded-full overflow-hidden border-2 border-emerald-500 shadow-md ${sizeClasses} ${className}`}>
        <img src={customUrl} alt="Foto do Responsável" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Render Illustrated SVG Characters
  switch (id) {
    case 'chef_manel':
      return (
        <div className={`relative rounded-full bg-emerald-100 border-2 border-emerald-600 shadow-md flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Chef Background Circle */}
            <circle cx="50" cy="50" r="48" fill="#d1fae5" />
            {/* Chef Torso / Avental */}
            <path d="M25 95 C25 65, 75 65, 75 95 Z" fill="#065f46" />
            {/* Lenço vermelho no pescoço */}
            <path d="M40 65 L50 78 L60 65 Z" fill="#dc2626" />
            {/* Face */}
            <circle cx="50" cy="48" r="22" fill="#fed7aa" />
            {/* Bigode paraense */}
            <path d="M40 54 Q50 59 60 54 Q55 60 50 57 Q45 60 40 54 Z" fill="#451a03" />
            {/* Olhos & Sorriso */}
            <circle cx="43" cy="43" r="2.5" fill="#1f2937" />
            <circle cx="57" cy="43" r="2.5" fill="#1f2937" />
            <path d="M46 51 Q50 54 54 51" stroke="#451a03" strokeWidth="1.5" fill="none" />
            {/* Chapéu de Chef (Toque Blanche) */}
            <path d="M32 30 C25 25, 25 10, 42 12 C45 5, 55 5, 58 12 C75 10, 75 25, 68 30 Z" fill="#ffffff" stroke="#9ca3af" strokeWidth="1.5" />
            <rect x="33" y="27" width="34" height="6" rx="2" fill="#ffffff" stroke="#9ca3af" strokeWidth="1" />
            {/* Colher de Pau / Garfo estilizado */}
            <path d="M72 65 L88 45" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
            <circle cx="89" cy="44" r="5" fill="#b45309" />
          </svg>
        </div>
      );

    case 'ze_estoque':
      return (
        <div className={`relative rounded-full bg-amber-100 border-2 border-amber-600 shadow-md flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#fef3c7" />
            {/* Torso / Macacão / Camisa Operacional */}
            <path d="M22 95 C22 65, 78 65, 78 95 Z" fill="#92400e" />
            <rect x="42" y="65" width="16" height="30" fill="#f59e0b" />
            {/* Face */}
            <circle cx="50" cy="48" r="22" fill="#fcd34d" />
            {/* Boné com aba para trás ou óculos de proteção */}
            <path d="M30 36 C30 22, 70 22, 70 36 Z" fill="#d97706" />
            <rect x="26" y="34" width="48" height="5" rx="2.5" fill="#b45309" />
            {/* Óculos de armação preta */}
            <rect x="38" y="42" width="10" height="8" rx="2" fill="none" stroke="#1f2937" strokeWidth="2" />
            <rect x="52" y="42" width="10" height="8" rx="2" fill="none" stroke="#1f2937" strokeWidth="2" />
            <line x1="48" y1="46" x2="52" y2="46" stroke="#1f2937" strokeWidth="2" />
            {/* Sorriso & Olhos */}
            <circle cx="43" cy="46" r="1.5" fill="#1f2937" />
            <circle cx="57" cy="46" r="1.5" fill="#1f2937" />
            <path d="M44 56 Q50 60 56 56" stroke="#78350f" strokeWidth="2" fill="none" />
            {/* Prancheta na mão */}
            <rect x="70" y="55" width="18" height="24" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <line x1="74" y1="62" x2="84" y2="62" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="74" y1="67" x2="84" y2="67" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="74" y1="72" x2="80" y2="72" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'dona_flor':
      return (
        <div className={`relative rounded-full bg-rose-100 border-2 border-rose-500 shadow-md flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#ffe4e6" />
            {/* Cabelo com coque e flor amazônica */}
            <circle cx="50" cy="44" r="28" fill="#3f2314" />
            <circle cx="70" cy="30" r="8" fill="#e11d48" />
            <circle cx="70" cy="30" r="4" fill="#fef08a" />
            {/* Torso / Uniforme elegante de salão */}
            <path d="M24 95 C24 68, 76 68, 76 95 Z" fill="#881337" />
            {/* Gola branca */}
            <path d="M42 68 L50 78 L58 68 Z" fill="#ffffff" />
            {/* Face */}
            <circle cx="50" cy="50" r="21" fill="#fbcfe8" />
            {/* Olhos amigáveis & Sorriso caloroso */}
            <path d="M40 46 Q44 43 48 46" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M52 46 Q56 43 60 46" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M43 56 Q50 63 57 56" stroke="#9f1239" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Bandeja com suco de cupuaçu/açaí */}
            <ellipse cx="25" cy="72" rx="14" ry="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
            <rect x="22" y="62" width="6" height="10" fill="#701a75" />
          </svg>
        </div>
      );

    case 'camila_caixa':
      return (
        <div className={`relative rounded-full bg-blue-100 border-2 border-blue-600 shadow-md flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#dbeafe" />
            {/* Cabelo */}
            <path d="M26 40 C26 20, 74 20, 74 40 L74 65 L26 65 Z" fill="#1e293b" />
            {/* Torso / Colete Azul Blindagem */}
            <path d="M22 95 C22 66, 78 66, 78 95 Z" fill="#1e3a8a" />
            {/* Crachá no peito */}
            <rect x="56" y="74" width="8" height="11" rx="1" fill="#ffffff" stroke="#1e40af" strokeWidth="1" />
            <line x1="58" y1="77" x2="62" y2="77" stroke="#2563eb" strokeWidth="1" />
            {/* Face */}
            <circle cx="50" cy="48" r="21" fill="#fde047" />
            {/* Headset de comunicação */}
            <path d="M30 46 A20 20 0 0 1 70 46" stroke="#475569" strokeWidth="3" fill="none" />
            <rect x="28" y="44" width="4" height="8" rx="2" fill="#0f172a" />
            <path d="M30 50 L38 58" stroke="#0f172a" strokeWidth="2" />
            <circle cx="39" cy="58" r="2" fill="#ef4444" />
            {/* Olhos focados e sorriso seguro */}
            <circle cx="44" cy="46" r="2" fill="#0f172a" />
            <circle cx="56" cy="46" r="2" fill="#0f172a" />
            <path d="M45 55 Q50 59 55 55" stroke="#1e3a8a" strokeWidth="2" fill="none" />
            {/* Calculadora / Maquininha */}
            <rect x="18" y="65" width="14" height="20" rx="2" fill="#334155" />
            <rect x="21" y="68" width="8" height="4" fill="#a7f3d0" />
          </svg>
        </div>
      );

    case 'seu_silva':
    default:
      return (
        <div className={`relative rounded-full bg-stone-200 border-2 border-stone-600 shadow-md flex items-center justify-center overflow-hidden ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#e7e5e4" />
            {/* Cabelos grisalhos */}
            <path d="M28 42 C28 20, 72 20, 72 42 Z" fill="#78716c" />
            {/* Torso / Terno Executivo / Camisa Social */}
            <path d="M22 95 C22 65, 78 65, 78 95 Z" fill="#292524" />
            <path d="M42 66 L50 90 L58 66 Z" fill="#ffffff" />
            <path d="M47 66 L50 85 L53 66 Z" fill="#059669" />
            {/* Face */}
            <circle cx="50" cy="48" r="21" fill="#f5d0fe" />
            {/* Bigode fino e óculos executivos */}
            <rect x="36" y="42" width="12" height="7" rx="1.5" fill="none" stroke="#1c1917" strokeWidth="1.5" />
            <rect x="52" y="42" width="12" height="7" rx="1.5" fill="none" stroke="#1c1917" strokeWidth="1.5" />
            <line x1="48" y1="45" x2="52" y2="45" stroke="#1c1917" strokeWidth="1.5" />
            <circle cx="42" cy="45" r="1.5" fill="#1c1917" />
            <circle cx="58" cy="45" r="1.5" fill="#1c1917" />
            <path d="M45 55 Q50 58 55 55" stroke="#1c1917" strokeWidth="2" fill="none" />
            {/* Selo de Padrão */}
            <circle cx="78" cy="74" r="8" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M75 74 L77 76 L82 71" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      );
  }
};

interface IllustratedStampProps {
  type: 'APROVADO' | 'NAO_CONFORME' | 'PEPS' | 'ETIQUETA_OBRIGATORIA' | 'ATENCAO' | 'PADRAO_PAI_DEGUA';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const IllustratedStamp: React.FC<IllustratedStampProps> = ({
  type,
  size = 'md',
  className = ''
}) => {
  const configs = {
    APROVADO: {
      text: 'PADRÃO APROVADO',
      sub: 'BISTRÔ PAI D\'ÉGUA',
      color: 'border-emerald-600 text-emerald-700 bg-emerald-50/90',
      icon: '✓'
    },
    NAO_CONFORME: {
      text: 'NÃO CONFORME',
      sub: 'ISOLAR IMEDIATAMENTE',
      color: 'border-rose-600 text-rose-700 bg-rose-50/90',
      icon: '✕'
    },
    PEPS: {
      text: 'REGRA P.E.P.S.',
      sub: 'PRIMEIRO ENTRA, PRIMEIRO SAI',
      color: 'border-amber-600 text-amber-800 bg-amber-50/90',
      icon: '⟳'
    },
    ETIQUETA_OBRIGATORIA: {
      text: 'ETIQUETA OBRIGATÓRIA',
      sub: 'SEM ETIQUETA = SEM USO',
      color: 'border-blue-600 text-blue-800 bg-blue-50/90',
      icon: '🏷'
    },
    ATENCAO: {
      text: 'PONTO DE ATENÇÃO',
      sub: 'CONFERÊNCIA OBRIGATÓRIA',
      color: 'border-amber-500 text-amber-700 bg-amber-50/90',
      icon: '⚠'
    },
    PADRAO_PAI_DEGUA: {
      text: '100% PAI D\'ÉGUA',
      sub: 'CULTURA & QUALIDADE',
      color: 'border-emerald-700 text-emerald-900 bg-emerald-100/90',
      icon: '★'
    }
  }[type];

  const sizeClasses = {
    sm: 'text-[9px] px-2 py-0.5 border',
    md: 'text-[11px] px-3 py-1 border-2',
    lg: 'text-xs px-4 py-1.5 border-2'
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center font-mono font-black uppercase tracking-wider rounded-md rotate-[-3deg] shadow-xs select-none ${configs.color} ${sizeClasses} ${className}`}>
      <div className="flex items-center space-x-1">
        <span>{configs.icon}</span>
        <span>{configs.text}</span>
      </div>
      <span className="text-[8px] tracking-normal font-sans font-medium opacity-80">{configs.sub}</span>
    </div>
  );
};
