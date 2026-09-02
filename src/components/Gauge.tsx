import React from 'react';

interface GaugeProps {
  /** 0 a 100 */
  value: number;
  label: string;
  sublabel?: string;
  /** texto grande no centro; se omitido usa `${value}%` */
  display?: string;
  size?: number;
  tone?: 'emerald' | 'amber' | 'rose' | 'blue' | 'stone' | 'violet';
  /** anima o arco ao montar */
  animate?: boolean;
}

const TONES: Record<string, { arc: string; track: string; text: string }> = {
  emerald: { arc: '#059669', track: '#d1fae5', text: '#065f46' },
  amber: { arc: '#d97706', track: '#fef3c7', text: '#92400e' },
  rose: { arc: '#e11d48', track: '#ffe4e6', text: '#9f1239' },
  blue: { arc: '#2563eb', track: '#dbeafe', text: '#1e40af' },
  stone: { arc: '#57534e', track: '#e7e5e4', text: '#292524' },
  violet: { arc: '#7c3aed', track: '#ede9fe', text: '#5b21b6' },
};

/** Anel de medição — 270° de varredura, faixa inferior aberta. */
export const Gauge: React.FC<GaugeProps> = ({
  value,
  label,
  sublabel,
  display,
  size = 132,
  tone = 'emerald',
  animate = true,
}) => {
  const clamped = Math.max(0, Math.min(100, isFinite(value) ? value : 0));
  const stroke = size * 0.1;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const sweep = 0.75; // 270°
  const circumference = 2 * Math.PI * r;
  const arcLen = circumference * sweep;
  const offset = arcLen * (1 - clamped / 100);
  const t = TONES[tone] || TONES.emerald;

  // começa às 135° (canto inferior esquerdo) girando no sentido horário
  const rotation = 135;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`rotate(${rotation} ${cx} ${cy})`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={t.track}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${arcLen} ${circumference}`}
            />
            <circle
              className={animate ? 'gauge-arc' : ''}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={t.arc}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${arcLen} ${circumference}`}
              strokeDashoffset={offset}
              style={
                {
                  '--gauge-len': `${arcLen}`,
                  '--gauge-offset': `${offset}`,
                } as React.CSSProperties
              }
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black leading-none" style={{ color: t.text }}>
            {display ?? `${Math.round(clamped)}%`}
          </span>
          {sublabel && (
            <span className="text-[10px] font-mono text-stone-400 mt-0.5">{sublabel}</span>
          )}
        </div>
      </div>
      <span className="text-[11px] font-bold text-stone-600 mt-1.5 max-w-[150px] leading-tight">
        {label}
      </span>
    </div>
  );
};

interface MiniBarProps {
  label: string;
  value: number; // 0-100
  caption?: string;
  tone?: 'emerald' | 'amber' | 'rose' | 'blue' | 'stone';
}

const BAR_TONES: Record<string, string> = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  blue: 'bg-blue-500',
  stone: 'bg-stone-500',
};

export const MiniBar: React.FC<MiniBarProps> = ({ label, value, caption, tone = 'emerald' }) => {
  const clamped = Math.max(0, Math.min(100, isFinite(value) ? value : 0));
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-bold text-stone-700 truncate">{label}</span>
        <span className="font-mono font-black text-stone-900 shrink-0 ml-2">{Math.round(clamped)}%</span>
      </div>
      <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bar-grow ${BAR_TONES[tone] || BAR_TONES.emerald}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {caption && <p className="text-[10px] text-stone-400">{caption}</p>}
    </div>
  );
};
