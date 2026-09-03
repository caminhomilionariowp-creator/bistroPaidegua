import React, { useState } from 'react';
import { POSTERS_DATA } from '../data/postersData';
import { PosterSlide, ResponsibleLeader } from '../types';
import { DEFAULT_TEAM_MEMBERS } from '../data/teamData';
import { 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  Clock,
  Sparkles, 
  Layers, 
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Scale,
  Sun,
  Flame,
  Moon,
  Smile,
  HeartHandshake,
  CheckSquare,
  Banknote,
  FileCheck,
  Award,
  HelpCircle,
  FileSpreadsheet,
  XCircle,
  Boxes,
  ShoppingCart,
  ShieldAlert,
  UserX,
  MessageSquareHeart,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { CharacterAvatar, IllustratedStamp } from './Characters';
import { BrandLogo, BrandWatermarkOverlay } from './BrandLogo';
import { Editable } from './Editable';

interface PosterStudioProps {
  selectedPosterId?: string;
  onOpenIllustrator?: (posterId: string) => void;
  team: ResponsibleLeader[];
  onNavigateToTeam?: () => void;
}

export const PosterStudio: React.FC<PosterStudioProps> = ({
  selectedPosterId,
  onOpenIllustrator,
  team,
  onNavigateToTeam,
}) => {
  const [activePosterId, setActivePosterId] = useState<string>(
    selectedPosterId || POSTERS_DATA[0].id
  );
  const [printSize, setPrintSize] = useState<'A3' | 'A4'>('A3');
  const [isBatchPrinting, setIsBatchPrinting] = useState<boolean>(false);

  const currentPoster = POSTERS_DATA.find((p) => p.id === activePosterId) || POSTERS_DATA[0];
  const currentLeader = (team && team.length > 0 ? team.find(t => t.sectorId === currentPoster.sectorId) || team[0] : null) || DEFAULT_TEAM_MEMBERS[0];

  const currentIndex = POSTERS_DATA.findIndex(p => p.id === activePosterId);
  const prevPoster = currentIndex > 0 ? POSTERS_DATA[currentIndex - 1] : null;
  const nextPoster = currentIndex < POSTERS_DATA.length - 1 ? POSTERS_DATA[currentIndex + 1] : null;

  const handlePrintCurrent = () => {
    setIsBatchPrinting(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handlePrintAllA3 = () => {
    setIsBatchPrinting(true);
    setTimeout(() => {
      window.print();
      setIsBatchPrinting(false);
    }, 250);
  };

  // Helper to render signal icons
  const renderSignalIcon = (iconName: string, colorHex: string) => {
    const iconClass = "w-4 h-4 shrink-0 mt-0.5";
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className={iconClass} style={{ color: colorHex }} />;
      case 'AlertTriangle': return <AlertTriangle className={iconClass} style={{ color: colorHex }} />;
      case 'XCircle': return <XCircle className={iconClass} style={{ color: colorHex }} />;
      case 'FileSpreadsheet': return <FileSpreadsheet className={iconClass} style={{ color: colorHex }} />;
      case 'Clock': return <Clock className={iconClass} style={{ color: colorHex }} />;
      case 'AlertOctagon': return <AlertOctagon className={iconClass} style={{ color: colorHex }} />;
      case 'ClipboardCheck': return <CheckCircle2 className={iconClass} style={{ color: colorHex }} />;
      case 'Boxes': return <Boxes className={iconClass} style={{ color: colorHex }} />;
      case 'ShoppingCart': return <ShoppingCart className={iconClass} style={{ color: colorHex }} />;
      case 'ShieldAlert': return <ShieldAlert className={iconClass} style={{ color: colorHex }} />;
      case 'Scale': return <Scale className={iconClass} style={{ color: colorHex }} />;
      case 'Sparkles': return <Sparkles className={iconClass} style={{ color: colorHex }} />;
      case 'UserX': return <UserX className={iconClass} style={{ color: colorHex }} />;
      case 'MessageSquareHeart': return <MessageSquareHeart className={iconClass} style={{ color: colorHex }} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} style={{ color: colorHex }} />;
      case 'Banknote': return <Banknote className={iconClass} style={{ color: colorHex }} />;
      case 'FileCheck': return <FileCheck className={iconClass} style={{ color: colorHex }} />;
      case 'Award': return <Award className={iconClass} style={{ color: colorHex }} />;
      case 'HelpCircle': return <HelpCircle className={iconClass} style={{ color: colorHex }} />;
      case 'AlertCircle': return <AlertCircle className={iconClass} style={{ color: colorHex }} />;
      case 'FileCheck2': return <FileCheck2 className={iconClass} style={{ color: colorHex }} />;
      default: return <CheckCircle2 className={iconClass} style={{ color: colorHex }} />;
    }
  };

  // Render individual poster layout
  const renderPosterContent = (poster: PosterSlide, isPrintView = false) => {
    const leader = (team && team.length > 0 ? team.find(t => t.sectorId === poster.sectorId) || team[0] : null) || DEFAULT_TEAM_MEMBERS[0];

    return (
      <div 
        key={poster.id}
        className={`bg-white border-2 border-stone-800 shadow-paper relative bg-blueprint-grid overflow-hidden flex flex-col justify-between ${
          isPrintView 
            ? 'a3-landscape-sheet' 
            : printSize === 'A3' 
              ? 'rounded-2xl p-5 sm:p-7 lg:p-8 a3-landscape-container' 
              : 'rounded-xl p-5 sm:p-6 max-w-4xl mx-auto'
        }`}
      >
        {/* Subtle Watermark in background */}
        <BrandWatermarkOverlay opacity={0.04} />

        {/* TOP HEADER - Carefully engineered with Brand Logo, Number and Title Hierarchy */}
        <div className="relative z-10 border-b-2 border-stone-900 pb-3.5 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Giant Number + Title Hierarchy */}
          <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
            {/* Giant Styled Numeral */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <span className="font-mono font-black text-3xl sm:text-4xl lg:text-5xl text-emerald-800 tracking-tighter leading-none select-none bg-emerald-50 border-2 border-emerald-300 px-3 py-1.5 rounded-xl shadow-xs">
                {poster.giantNumber}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-950 mt-1">
                CARTAZ OFICIAL
              </span>
            </div>

            {/* Title & Subtitle Hierarchy */}
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div className="bg-stone-900 px-2 py-0.5 rounded flex items-center shadow-xs">
                  <BrandLogo variant="horizontal" size="xs" theme="dark" />
                </div>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded">
                  {poster.category.toUpperCase()} • PADRÃO V1.1
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-stone-500 font-bold hidden sm:inline">
                  DIMENSÃO: 297mm x 420mm (A3)
                </span>
              </div>

              <Editable as="h1" multiline path={`poster.${poster.id}.title`} seed={poster.title} className="block text-lg sm:text-xl lg:text-2xl font-black text-stone-900 tracking-tight leading-tight" />

              <Editable as="p" multiline path={`poster.${poster.id}.subtitle`} seed={poster.subtitle} className="block text-xs sm:text-sm font-semibold text-stone-600 leading-snug" />
            </div>
          </div>

          {/* Right: Dynamic Sector Responsible Badge (With photo/avatar & WhatsApp) */}
          <div className="shrink-0 bg-stone-50 border-2 border-stone-300 rounded-xl p-2 sm:p-2.5 flex items-center space-x-2.5 shadow-xs w-full md:w-auto md:max-w-xs">
            <CharacterAvatar 
              id={poster.characterId} 
              size="md" 
              customUrl={leader.photoUrl} 
            />
            <div className="text-left space-y-0.5 min-w-0 flex-1">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-800 block">
                Líder Responsável do Posto
              </span>
              <div className="font-extrabold text-stone-900 text-xs leading-snug">
                {leader.name}
              </div>
              <div className="text-[10px] text-stone-600 font-medium leading-tight">
                {leader.role}
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-700">
                {leader.phone}
              </div>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION - Specific Visual Content per Poster */}
        <div className="flex-1 space-y-4 my-2">
          
          {/* CARTAZ 01: COZINHA - CICLO DO TURNO */}
          {poster.id === 'poster-01-cozinha' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {poster.elements[0].data.phases.map((phase: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`border-2 rounded-xl p-4 shadow-xs flex flex-col justify-between ${phase.color}`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-300/80 pb-2 mb-2.5">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${phase.badgeColor}`}>
                          {phase.number}
                        </span>
                        <div className="text-right">
                          <span className="font-extrabold text-stone-900 text-xs block">{phase.title}</span>
                          <span className="text-[10px] text-stone-600 font-mono font-bold">{phase.time}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs">
                        {phase.items.map((item: string, iIdx: number) => (
                          <li key={iIdx} className="flex items-start space-x-1.5">
                            <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                            <span className="leading-tight text-stone-800">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-300/80 flex items-center justify-between text-[10px] font-mono font-bold text-stone-700">
                      <span>Fase {idx + 1} de 3</span>
                      {idx < 2 ? <ArrowRight className="w-3.5 h-3.5 text-stone-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Character Callout Banner */}
              <div className="bg-emerald-100/70 border-2 border-emerald-400 rounded-xl p-3 flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <CharacterAvatar id="chef_manel" size="sm" customUrl={leader.photoUrl} />
                  <div>
                    <span className="font-extrabold text-emerald-950 text-xs block">
                      {poster.characterTitle}:
                    </span>
                    <p className="text-xs text-emerald-900 italic leading-tight">
                      <Editable multiline path={`poster.${poster.id}.quote`} seed={poster.characterQuote} />
                    </p>
                  </div>
                </div>
                <IllustratedStamp type="PADRAO_PAI_DEGUA" size="sm" />
              </div>
            </div>
          )}

          {/* CARTAZ 02: RASTREABILIDADE UNIVERSAL */}
          {poster.id === 'poster-02-rastreabilidade' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Left: 2 Field Descriptions */}
                <div className="md:col-span-4 space-y-3">
                  <div className="bg-stone-50 border-2 border-stone-400 p-3.5 rounded-xl shadow-xs">
                    <div className="text-xs font-bold text-stone-900 mb-1 flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-mono font-bold">1</span>
                      <span>[Nome do Produto / Corte]</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-snug">
                      Evita trocas e permite achar o corte, molho ou polpa exata em segundos na geladeira.
                    </p>
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-400 p-3.5 rounded-xl shadow-xs">
                    <div className="text-xs font-bold text-blue-950 mb-1 flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">2</span>
                      <span>[Data & Hora de Preparo]</span>
                    </div>
                    <p className="text-xs text-blue-900 leading-snug">
                      Rastreia o momento exato em que a embalagem foi aberta ou fracionada pelo cozinheiro.
                    </p>
                  </div>
                </div>

                {/* Center: Official Giant Label Mockup */}
                <div className="md:col-span-4 bg-white border-4 border-stone-900 rounded-2xl p-4 shadow-lg text-center space-y-2.5 font-mono">
                  <div className="bg-stone-900 text-white py-1 px-3 text-xs font-black rounded tracking-widest uppercase flex items-center justify-between">
                    <span>ETIQUETA UNIVERSAL</span>
                    <span className="text-amber-400 font-sans text-[10px]">PAI D'ÉGUA</span>
                  </div>

                  <div className="border-2 border-dashed border-stone-400 p-3 rounded-lg bg-stone-50 text-left space-y-2">
                    <div className="border-b border-stone-300 pb-1">
                      <span className="text-[9px] text-stone-500 font-bold block uppercase">PRODUTO:</span>
                      <span className="font-extrabold text-stone-900 text-sm">[FILHOTE EM POSTAS]</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b border-stone-300 pb-1">
                      <div>
                        <span className="text-[9px] text-stone-500 block">PREPARO / HORA:</span>
                        <span className="font-bold text-xs text-stone-800">[15/10 - 08:30]</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 block">VALIDADE / HORA:</span>
                        <span className="font-bold text-xs text-rose-700">[17/10 - 22:00]</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <div>
                        <span className="text-[9px] text-stone-500 block">EXECUTOR:</span>
                        <span className="font-bold text-xs text-stone-800">[Chef Manel]</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 block">CONFERENTE:</span>
                        <span className="font-bold text-xs text-stone-800">[Auxiliar]</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] font-black text-emerald-900 bg-emerald-200/90 py-1 px-2 rounded-md tracking-wider uppercase">
                    COLAR ANTES DE GUARDAR
                  </div>
                </div>

                {/* Right: 2 Field Descriptions */}
                <div className="md:col-span-4 space-y-3">
                  <div className="bg-rose-50 border-2 border-rose-400 p-3.5 rounded-xl shadow-xs">
                    <div className="text-xs font-bold text-rose-950 mb-1 flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-rose-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">3</span>
                      <span>[Data & Hora de Validade]</span>
                    </div>
                    <p className="text-xs text-rose-900 leading-snug">
                      Segurança biológica inegociável. NUNCA preencher por "chute". Seguir tabela oficial.
                    </p>
                  </div>

                  <div className="bg-emerald-50 border-2 border-emerald-400 p-3.5 rounded-xl shadow-xs">
                    <div className="text-xs font-bold text-emerald-950 mb-1 flex items-center space-x-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-mono font-bold">4</span>
                      <span>[Responsável & Conferente]</span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-snug">
                      Autoria profissional. Comprova quem manipulou e quem validou o lote para uso.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* CARTAZ 03: ESTOQUE - PREVENÇÃO DE RUPTURA & PEPS */}
          {poster.id === 'poster-03-estoque' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Visual Thermometer */}
                <div className="md:col-span-3 flex flex-col items-center">
                  <div className="w-24 bg-stone-100 border-4 border-stone-900 rounded-3xl p-1.5 shadow-md flex flex-col justify-between min-h-[250px] h-full">
                    <div className="py-3 bg-emerald-500 rounded-t-2xl flex flex-col items-center justify-center text-white font-black text-xs text-center p-1 shadow-inner">
                      <span>NÍVEL</span>
                      <span>IDEAL</span>
                    </div>
                    <div className="py-3 bg-amber-400 flex flex-col items-center justify-center text-stone-950 font-black text-xs text-center p-1">
                      <span>MÍNIMO</span>
                      <span className="text-[9px]">(Gatilho)</span>
                    </div>
                    <div className="py-3 bg-orange-500 flex flex-col items-center justify-center text-white font-black text-xs text-center p-1">
                      <span>CRÍTICO</span>
                      <span className="text-[9px]">Atenção</span>
                    </div>
                    <div className="py-3 bg-rose-600 rounded-b-2xl flex flex-col items-center justify-center text-white font-black text-xs text-center p-1 shadow-inner">
                      <span>RUPTURA</span>
                      <span className="text-[9px]">Zero</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-stone-600 mt-2">
                    GATILHO DE COMPRAS
                  </span>
                </div>

                {/* Level Descriptions + PEPS Rule */}
                <div className="md:col-span-9 space-y-2">
                  {poster.elements[0].data.levels.map((lvl: any, idx: number) => (
                    <div key={idx} className="bg-stone-50 border-2 border-stone-300 rounded-xl p-2.5 flex items-start space-x-2.5 shadow-xs">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono shrink-0 ${lvl.color}`}>
                        {lvl.badge}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-stone-900 text-xs">{lvl.level}</div>
                        <p className="text-[10px] sm:text-[11px] text-stone-600 leading-tight">{lvl.desc}</p>
                        <div className="text-[10px] font-bold text-stone-900 mt-0.5 bg-white px-2 py-0.5 rounded border border-stone-200 inline-block">
                          {lvl.action}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-amber-100/80 border-2 border-amber-400 rounded-xl p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">🔄</span>
                      <span className="font-bold text-amber-950 text-xs">
                        Regra P.E.P.S.: Primeiro que Entra, Primeiro que Sai. Lotes novos atrás, antigos na frente!
                      </span>
                    </div>
                    <IllustratedStamp type="PEPS" size="sm" />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* CARTAZ 04: SALÃO & HOSPITALIDADE */}
          {poster.id === 'poster-04-salao' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {poster.elements[0].data.phases.map((phase: any, idx: number) => (
                  <div key={idx} className={`border-2 rounded-xl p-3.5 flex flex-col justify-between ${phase.color} shadow-xs`}>
                    <div>
                      <div className="border-b border-stone-300/80 pb-1.5 mb-2 flex items-center justify-between">
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded text-white ${phase.badgeColor}`}>
                          {phase.number}
                        </span>
                        <span className="font-black text-stone-900 text-xs">{phase.title}</span>
                      </div>

                      <ul className="space-y-1.5 text-[11px]">
                        {phase.items.map((it: string, iIdx: number) => (
                          <li key={iIdx} className="flex items-start space-x-1.5">
                            <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                            <span className="leading-tight text-stone-800">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-300/80 text-[10px] font-mono font-bold text-stone-600 flex items-center justify-between">
                      <span>Etapa {idx + 1} de 4</span>
                      {idx < 3 ? <ArrowRight className="w-3 h-3 text-stone-500" /> : <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dona Flor Message */}
              <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CharacterAvatar id="dona_flor" size="sm" customUrl={leader.photoUrl} />
                  <div>
                    <span className="font-extrabold text-rose-950 text-xs block">
                      {poster.characterTitle}:
                    </span>
                    <p className="text-xs text-rose-900 italic leading-tight">
                      <Editable multiline path={`poster.${poster.id}.quote`} seed={poster.characterQuote} />
                    </p>
                  </div>
                </div>
                <IllustratedStamp type="PADRAO_PAI_DEGUA" size="sm" />
              </div>
            </div>
          )}

          {/* CARTAZ 05: CAIXA & BLINDAGEM FINANCEIRA */}
          {poster.id === 'poster-05-caixa' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {poster.elements[0].data.columns.map((col: any, idx: number) => (
                  <div key={idx} className={`border-2 rounded-xl p-3.5 flex flex-col justify-between ${col.color} shadow-xs`}>
                    <div>
                      <h3 className="text-xs font-black text-stone-900 border-b border-stone-300/80 pb-1.5 mb-2.5">
                        {col.title}
                      </h3>
                      <div className="space-y-2">
                        {col.steps.map((st: any, sIdx: number) => (
                          <div key={sIdx} className="bg-white/90 p-2 rounded-lg border border-stone-200 shadow-2xs text-[11px]">
                            <div className="font-bold text-stone-900 flex items-center space-x-1 mb-0.5">
                              <span className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center text-[9px] font-mono">
                                {sIdx + 1}
                              </span>
                              <span>{st.title}</span>
                            </div>
                            <p className="text-stone-600 pl-5 leading-tight">{st.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-300/80 text-[10px] font-mono font-bold text-stone-600 text-right">
                      Pilar {idx + 1} de 4
                    </div>
                  </div>
                ))}
              </div>

              {/* Camila Message */}
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CharacterAvatar id="camila_caixa" size="sm" customUrl={leader.photoUrl} />
                  <div>
                    <span className="font-extrabold text-blue-950 text-xs block">
                      {poster.characterTitle}:
                    </span>
                    <p className="text-xs text-blue-900 italic leading-tight">
                      <Editable multiline path={`poster.${poster.id}.quote`} seed={poster.characterQuote} />
                    </p>
                  </div>
                </div>
                <IllustratedStamp type="APROVADO" size="sm" />
              </div>
            </div>
          )}

          {/* CARTAZ 06: GOVERNANÇA & OS 6 PRINCÍPIOS */}
          {poster.id === 'poster-06-governanca' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* 4 Universal Colors */}
                <div className="md:col-span-5 space-y-2">
                  <h3 className="font-black text-stone-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    Código Oficial de 4 Cores
                  </h3>
                  {poster.elements[0].data.colors.map((c: any, idx: number) => (
                    <div key={idx} className="bg-stone-50 border border-stone-300 rounded-lg p-2.5 flex items-center space-x-3 shadow-2xs">
                      <div 
                        className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      >
                        {c.code[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-stone-900 text-xs">{c.title}</div>
                        <p className="text-[10px] text-stone-600 leading-tight">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6 Inviolable Principles */}
                <div className="md:col-span-7 space-y-2">
                  <h3 className="font-black text-stone-900 text-xs uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Os 6 Princípios Inegociáveis (Cultura)
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono font-normal">Padrão Franquia</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {poster.elements[0].data.principles.map((p: any, idx: number) => (
                      <div key={idx} className="bg-stone-50 border border-stone-300 rounded-lg p-2 sm:p-2.5 shadow-2xs">
                        <div className="font-extrabold text-stone-900 text-xs mb-0.5 flex items-center space-x-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[9px] font-mono shrink-0">
                            {p.num}
                          </span>
                          <span className="leading-tight text-[11px] font-extrabold">{p.title}</span>
                        </div>
                        <p className="text-[10px] text-stone-600 leading-tight">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* BOTTOM SECTION: SINAIS VISUAIS DO POSTO (Carefully aligned, no overlapping) */}
        <div className="mt-4 pt-3 border-t-2 border-stone-800 space-y-2.5">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
              <span>🚦</span> SINAIS VISUAIS DO POSTO (AÇÃO IMEDIATA)
            </span>
            <span className="text-[10px] font-mono text-stone-500">
              LEGENDA OPERACIONAL DE SEGURANÇA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {poster.signals.map((sig, sIdx) => (
              <div 
                key={sIdx}
                className="bg-stone-50 rounded-lg p-2 border-2 flex items-start space-x-2 shadow-2xs"
                style={{ borderColor: sig.hex }}
              >
                <div className="mt-0.5 shrink-0">
                  {renderSignalIcon(sig.iconName, sig.hex)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span 
                      className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 rounded text-white shrink-0"
                      style={{ backgroundColor: sig.hex }}
                    >
                      {sig.colorCode}
                    </span>
                    <span className="text-[10px] font-bold text-stone-900 leading-tight text-right">{sig.title}</span>
                  </div>
                  <p className="text-[10px] text-stone-600 leading-tight mt-1 font-medium">
                    {sig.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule Banner on the base */}
          <div className="bg-emerald-950 text-white px-3.5 py-2 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2.5">
              <span className="text-base shrink-0">⭐</span>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  REGRA INEGOCIÁVEL DO POSTO
                </span>
                <span className="text-xs font-bold text-emerald-100 leading-tight block">
                  <Editable multiline path={`poster.${poster.id}.rule`} seed={poster.goldenRule} />
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-700/60 hidden sm:inline-block shrink-0">
              Validação de Liderança
            </span>
          </div>

          {/* Technical Print Footer */}
          <div className="flex justify-between items-center text-[9px] text-stone-500 font-mono pt-0.5">
            <span>BISTRÔ PAI D'ÉGUA • SISTEMA OPERACIONAL V1.1 • CARTAZ #{poster.giantNumber}</span>
            <span>MARGENS DE IMPRESSÃO A3 (297 x 420 mm) • SEM CORTES</span>
          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      
      {/* Top Control Bar with 6 Poster Selector & Print Actions */}
      <div className="no-print bg-white p-4 sm:p-5 rounded-xl border border-stone-300 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                6 Cartazes Ilustrados A3
              </span>
              <span className="text-stone-400 text-xs">• Tamanho Real 297mm x 420mm</span>
            </div>
            <h2 className="text-lg font-black text-stone-900 mt-0.5">
              Estúdio de Cartazes de Parede do Bistrô Pai d'Égua
            </h2>
            <p className="text-xs text-stone-500">
              Visualização fiel ajustada ao PDF v2, com numerais gigantes não sobrepostos, crachás de responsáveis e sinais visuais na base.
            </p>
          </div>

          {/* Print & View Size Controls */}
          <div className="flex flex-wrap items-center gap-2 self-end md:self-auto">
            {/* Size Switcher */}
            <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => setPrintSize('A3')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  printSize === 'A3' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                A3 (297x420mm)
              </button>
              <button
                onClick={() => setPrintSize('A4')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  printSize === 'A4' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                A4 Padrão
              </button>
            </div>

            {/* Print Current */}
            <button
              onClick={handlePrintCurrent}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              title="Imprimir cartaz atual em tamanho real A3"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Este Cartaz</span>
            </button>

            {/* Print All 6 in Batch */}
            <button
              onClick={handlePrintAllA3}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs border border-amber-500/40 shadow-sm transition-all cursor-pointer"
              title="Gerar PDF / Imprimir todas as 6 folhas A3 de uma vez"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Imprimir Kit Completo (6 Páginas A3)</span>
            </button>
          </div>
        </div>

        {/* 6 Posters Quick Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-stone-100">
          {POSTERS_DATA.map((poster) => {
            const isSelected = activePosterId === poster.id;
            const leader = (team && team.length > 0 ? team.find(t => t.sectorId === poster.sectorId) || team[0] : null) || DEFAULT_TEAM_MEMBERS[0];

            return (
              <button
                key={poster.id}
                onClick={() => setActivePosterId(poster.id)}
                className={`p-2.5 rounded-lg border-2 text-left transition-all flex flex-col justify-between space-y-1.5 ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/80 font-bold shadow-xs' 
                    : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs bg-emerald-800 text-white px-1.5 py-0.2 rounded">
                    #{poster.giantNumber}
                  </span>
                  <CharacterAvatar id={poster.characterId} size="sm" customUrl={leader?.photoUrl} />
                </div>
                <div>
                  <div className="text-xs truncate font-bold text-stone-900">{poster.category}</div>
                  <div className="text-[10px] text-stone-500 truncate">{leader?.name?.split(' ')[0] || 'Líder'}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Quick Tools */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-stone-600">
          <div className="flex items-center space-x-2">
            {prevPoster && (
              <button
                onClick={() => setActivePosterId(prevPoster.id)}
                className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior: #{prevPoster.giantNumber} {prevPoster.category}</span>
              </button>
            )}
            {nextPoster && (
              <button
                onClick={() => setActivePosterId(nextPoster.id)}
                className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-semibold ml-3"
              >
                <span>Próximo: #{nextPoster.giantNumber} {nextPoster.category}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToTeam}
              className="text-stone-700 hover:text-stone-900 font-bold bg-stone-100 px-3 py-1 rounded-md border border-stone-300 transition-colors text-xs"
            >
              Editar Líderes dos Cartazes
            </button>
          </div>
        </div>

      </div>

      {/* RENDER ACTIVE POSTER (FOR SCREEN & SINGLE PRINT) */}
      {!isBatchPrinting && renderPosterContent(currentPoster)}

      {/* RENDER ALL 6 POSTERS (WHEN BATCH PRINTING) */}
      {isBatchPrinting && (
        <div className="space-y-8">
          {POSTERS_DATA.map((poster) => renderPosterContent(poster, true))}
        </div>
      )}

    </div>
  );
};
