import React, { useRef, useState, useEffect } from 'react';
import { 
  Palette, 
  PenTool, 
  Square, 
  Circle, 
  ArrowRight, 
  Type, 
  Stamp, 
  Trash2, 
  Download, 
  Upload, 
  Undo, 
  CheckCircle2, 
  AlertTriangle,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface IllustrationCanvasProps {
  targetTitle?: string;
  onSaveIllustration?: (dataUrl: string) => void;
}

export const IllustrationCanvas: React.FC<IllustrationCanvasProps> = ({
  targetTitle = "Área de Trabalho / Bancada / Equipamento do Bistrô",
  onSaveIllustration
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<'brush' | 'arrow' | 'rect' | 'circle' | 'text' | 'stamp'>('brush');
  const [brushColor, setBrushColor] = useState<string>('#ef4444'); // Default red for operational callouts
  const [brushSize, setBrushSize] = useState<number>(4);
  const [selectedStamp, setSelectedStamp] = useState<string>('ETIQUETA OBRIGATÓRIA');
  const [customText, setCustomText] = useState<string>('PONTO CRÍTICO');
  
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Initialize canvas with grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw blueprint grid lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Save initial state to history
    setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  }, []);

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e);
    setStartPos(coords);
    setIsDrawing(true);

    // Save snapshot for shapes preview
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (selectedTool === 'brush') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
    } else if (selectedTool === 'stamp') {
      drawStamp(ctx, coords.x, coords.y, selectedStamp);
      saveState();
      setIsDrawing(false);
    } else if (selectedTool === 'text') {
      ctx.fillStyle = brushColor;
      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(customText, coords.x, coords.y);
      saveState();
      setIsDrawing(false);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoordinates(e);

    if (selectedTool === 'brush') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (snapshot) {
      // Restore snapshot to draw shape preview cleanly
      ctx.putImageData(snapshot, 0, 0);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;

      if (selectedTool === 'rect') {
        ctx.strokeRect(startPos.x, startPos.y, coords.x - startPos.x, coords.y - startPos.y);
      } else if (selectedTool === 'circle') {
        const radius = Math.sqrt(Math.pow(coords.x - startPos.x, 2) + Math.pow(coords.y - startPos.y, 2));
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (selectedTool === 'arrow') {
        drawArrow(ctx, startPos.x, startPos.y, coords.x, coords.y);
      }
    }
  };

  const stopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
    const headlen = 14;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fillStyle = brushColor;
    ctx.fill();
  };

  const drawStamp = (ctx: CanvasRenderingContext2D, x: number, y: number, text: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.08); // slight dynamic angle

    const isAlert = text.includes('NÃO') || text.includes('OBRIGATÓRIA') || text.includes('CRÍTICO');
    const bgCol = isAlert ? '#ef4444' : '#10b981';

    ctx.fillStyle = bgCol;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    const width = text.length * 10 + 24;
    const height = 30;

    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.strokeRect(-width / 2 + 2, -height / 2 + 2, width - 4, height - 4);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);

    ctx.restore();
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setHistory([...history, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    const prevState = newHistory[newHistory.length - 1];
    ctx.putImageData(prevState, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw image keeping ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        saveState();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ilustracao-bistro-paidegua-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    if (onSaveIllustration) {
      onSaveIllustration(dataUrl);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Studio Banner */}
      <div className="bg-white p-5 rounded-xl border border-stone-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
            <Palette className="w-5 h-5 text-emerald-600" />
            <span>Estúdio de Ilustração & Anotação de Fotos Reais do Bistrô</span>
          </h2>
          <p className="text-xs text-stone-500">
            Carregue fotos reais da cozinha, estoque e salão, faça anotações visuais com setas, círculos e carimbos operacionais.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 border border-stone-300">
            <Upload className="w-3.5 h-3.5" />
            <span>Carregar Foto Real</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <button
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Imagem PNG</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-stone-900 text-stone-100 p-4 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Tools */}
        <div className="flex items-center space-x-1.5">
          {[
            { id: 'brush', label: 'Pincel', icon: PenTool },
            { id: 'arrow', label: 'Seta de Fluxo', icon: ArrowRight },
            { id: 'rect', label: 'Retângulo', icon: Square },
            { id: 'circle', label: 'Círculo Destaque', icon: Circle },
            { id: 'text', label: 'Texto', icon: Type },
            { id: 'stamp', label: 'Carimbo Oficial', icon: Stamp },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id as any)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  isActive ? 'bg-emerald-500 text-stone-950 font-bold' : 'hover:bg-stone-800 text-stone-300'
                }`}
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Colors Palette (Official Visual Management Colors) */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-stone-400 font-mono uppercase">Cor:</span>
          {[
            { name: 'Vermelho (Parar/Alerta)', color: '#ef4444' },
            { name: 'Amarelo (Atenção/Conferência)', color: '#f59e0b' },
            { name: 'Verde (Aprovado/Padrão)', color: '#10b981' },
            { name: 'Azul (Registro/Sistema)', color: '#3b82f6' },
            { name: 'Preto (Texto/Estrutura)', color: '#18181b' },
          ].map((c) => (
            <button
              key={c.color}
              onClick={() => setBrushColor(c.color)}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                brushColor === c.color ? 'scale-125 border-white shadow-sm' : 'border-stone-600 hover:scale-110'
              }`}
              style={{ backgroundColor: c.color }}
              title={c.name}
            />
          ))}
        </div>

        {/* Stamps Selector if stamp mode active */}
        {selectedTool === 'stamp' && (
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-amber-400 font-bold">Carimbo:</span>
            <select
              value={selectedStamp}
              onChange={(e) => setSelectedStamp(e.target.value)}
              className="bg-stone-800 text-white text-xs rounded px-2 py-1 border border-stone-700 font-mono"
            >
              <option value="ETIQUETA OBRIGATÓRIA">ETIQUETA OBRIGATÓRIA</option>
              <option value="PRIMEIRO QUE ENTRA, PRIMEIRO QUE SAI (PEPS)">PEPS OBRIGATÓRIO</option>
              <option value="APROVADO CONFORME">APROVADO CONFORME</option>
              <option value="NÃO CONFORME / SEPARAR">NÃO CONFORME / SEPARAR</option>
              <option value="PONTO CRÍTICO">PONTO CRÍTICO</option>
            </select>
          </div>
        )}

        {/* Custom text input if text mode active */}
        {selectedTool === 'text' && (
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-emerald-400 font-bold">Texto:</span>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="bg-stone-800 text-white text-xs rounded px-2 py-1 border border-stone-700 font-bold"
              placeholder="Digite o texto..."
            />
          </div>
        )}

        {/* History Actions */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handleUndo}
            className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center space-x-1"
            title="Desfazer último traço"
          >
            <Undo className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desfazer</span>
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded bg-stone-800 hover:bg-rose-900 text-rose-300 text-xs flex items-center space-x-1"
            title="Limpar tela"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        </div>

      </div>

      {/* Main Drawing Canvas */}
      <div className="bg-stone-200 p-4 rounded-xl border border-stone-400 flex justify-center shadow-inner overflow-auto">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          className="bg-white border-2 border-stone-800 rounded-lg shadow-paper cursor-crosshair max-w-full"
        />
      </div>

      {/* Instructions */}
      <div className="bg-stone-50 border border-stone-300 rounded-lg p-4 text-xs text-stone-600 flex items-start space-x-3">
        <span className="text-xl">💡</span>
        <div className="space-y-1">
          <span className="font-bold text-stone-900 block text-xs">
            Como utilizar as ilustrações nos documentos oficiais do Bistrô:
          </span>
          <p className="leading-relaxed">
            1. Carregue uma foto da bancada de mise en place, geladeira de carnes/açaí ou armário de estoque.
          </p>
          <p className="leading-relaxed">
            2. Aplique a Seta de Fluxo ou o Círculo Vermelho de Ponto Crítico e o Carimbo <strong>"ETIQUETA OBRIGATÓRIA"</strong> ou <strong>"PEPS OBRIGATÓRIO"</strong>.
          </p>
          <p className="leading-relaxed">
            3. Clique em <strong>"Exportar Imagem PNG"</strong> para salvar ou anexar diretamente nos cartazes de parede ou fichas técnicas.
          </p>
        </div>
      </div>

    </div>
  );
};
