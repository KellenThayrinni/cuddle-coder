import type { ToolId } from "./EditorToolbar";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline
} from "lucide-react";

interface EditorPropertiesProps {
  activeTool: ToolId;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
    {children}
  </div>
);

const SliderField = ({ label, value, max, unit }: { label: string; value: number; max: number; unit?: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <Label className="text-xs">{label}</Label>
      <span className="text-xs text-muted-foreground">{value}{unit}</span>
    </div>
    <Slider defaultValue={[value]} max={max} step={1} />
  </div>
);

const ColorSwatch = ({ color, active }: { color: string; active?: boolean }) => (
  <button
    className={`w-7 h-7 rounded-md border-2 transition-all ${active ? "border-primary scale-110 shadow-sm" : "border-border hover:scale-105"}`}
    style={{ backgroundColor: color }}
  />
);

const SelectionProperties = () => (
  <>
    <Section title="Posição">
      <div className="grid grid-cols-2 gap-2">
        <div><Label className="text-xs">X</Label><Input type="number" defaultValue={0} className="h-8 text-xs" /></div>
        <div><Label className="text-xs">Y</Label><Input type="number" defaultValue={0} className="h-8 text-xs" /></div>
      </div>
    </Section>
    <Section title="Dimensões">
      <div className="grid grid-cols-2 gap-2">
        <div><Label className="text-xs">Largura</Label><Input type="number" defaultValue={200} className="h-8 text-xs" /></div>
        <div><Label className="text-xs">Altura</Label><Input type="number" defaultValue={150} className="h-8 text-xs" /></div>
      </div>
    </Section>
    <Section title="Opacidade">
      <SliderField label="Opacidade" value={100} max={100} unit="%" />
    </Section>
  </>
);

const ShapeProperties = () => (
  <>
    <Section title="Preenchimento">
      <div className="flex gap-1.5 flex-wrap">
        {["#6f17af", "#360353", "#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#1abc9c", "#ffffff", "#000000"].map(c => (
          <ColorSwatch key={c} color={c} active={c === "#6f17af"} />
        ))}
      </div>
      <Input type="text" defaultValue="#6f17af" className="h-8 text-xs mt-2" />
    </Section>
    <Section title="Contorno">
      <SliderField label="Espessura" value={2} max={20} unit="px" />
      <div className="flex gap-1.5 flex-wrap mt-2">
        {["#000000", "#6f17af", "#e74c3c", "#3498db", "transparent"].map(c => (
          <ColorSwatch key={c} color={c === "transparent" ? "#fff" : c} />
        ))}
      </div>
    </Section>
    <Section title="Borda">
      <SliderField label="Arredondamento" value={0} max={50} unit="px" />
    </Section>
  </>
);

const TextProperties = () => (
  <>
    <Section title="Fonte">
      <Select defaultValue="inter">
        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
        <SelectContent>
          {["Inter", "Roboto", "Poppins", "Montserrat", "Open Sans"].map(f => (
            <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div><Label className="text-xs">Tamanho</Label><Input type="number" defaultValue={16} className="h-8 text-xs" /></div>
        <div><Label className="text-xs">Peso</Label>
          <Select defaultValue="400">
            <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["300", "400", "500", "600", "700", "800"].map(w => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Section>
    <Section title="Estilo">
      <div className="flex gap-1">
        {[
          { icon: Bold, label: "Negrito" },
          { icon: Italic, label: "Itálico" },
          { icon: Underline, label: "Sublinhado" },
        ].map(({ icon: Icon, label }) => (
          <Button key={label} variant="outline" size="sm" className="h-8 w-8 p-0">
            <Icon className="w-3.5 h-3.5" />
          </Button>
        ))}
      </div>
    </Section>
    <Section title="Alinhamento">
      <div className="flex gap-1">
        {[AlignLeft, AlignCenter, AlignRight, AlignJustify].map((Icon, i) => (
          <Button key={i} variant={i === 0 ? "default" : "outline"} size="sm" className="h-8 w-8 p-0">
            <Icon className="w-3.5 h-3.5" />
          </Button>
        ))}
      </div>
    </Section>
    <Section title="Cor">
      <div className="flex gap-1.5 flex-wrap">
        {["#000000", "#ffffff", "#6f17af", "#e74c3c", "#3498db", "#2ecc71"].map(c => (
          <ColorSwatch key={c} color={c} active={c === "#000000"} />
        ))}
      </div>
    </Section>
    <Section title="Espaçamento">
      <SliderField label="Entrelinhas" value={140} max={300} unit="%" />
      <SliderField label="Entrecaracteres" value={0} max={20} unit="px" />
    </Section>
  </>
);

const BrushProperties = () => (
  <>
    <Section title="Pincel">
      <SliderField label="Tamanho" value={12} max={100} unit="px" />
      <SliderField label="Dureza" value={80} max={100} unit="%" />
      <SliderField label="Opacidade" value={100} max={100} unit="%" />
    </Section>
    <Section title="Cor">
      <div className="flex gap-1.5 flex-wrap">
        {["#000000", "#ffffff", "#6f17af", "#e74c3c", "#3498db", "#2ecc71", "#f1c40f"].map(c => (
          <ColorSwatch key={c} color={c} active={c === "#000000"} />
        ))}
      </div>
      <Input type="text" defaultValue="#000000" className="h-8 text-xs mt-2" />
    </Section>
  </>
);

const TransformProperties = () => (
  <>
    <Section title="Transformação">
      <SliderField label="Rotação" value={0} max={360} unit="°" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div><Label className="text-xs">Escala X</Label><Input type="number" defaultValue={100} className="h-8 text-xs" /></div>
        <div><Label className="text-xs">Escala Y</Label><Input type="number" defaultValue={100} className="h-8 text-xs" /></div>
      </div>
    </Section>
    <Section title="Ajustes de Imagem">
      <SliderField label="Brilho" value={50} max={100} unit="%" />
      <SliderField label="Contraste" value={50} max={100} unit="%" />
      <SliderField label="Saturação" value={50} max={100} unit="%" />
    </Section>
  </>
);

const ImageProperties = () => (
  <>
    <Section title="Imagem">
      <Button variant="outline" size="sm" className="w-full text-xs h-8">
        📁 Carregar imagem
      </Button>
    </Section>
    <Section title="Ajustes">
      <SliderField label="Brilho" value={50} max={100} unit="%" />
      <SliderField label="Contraste" value={50} max={100} unit="%" />
      <SliderField label="Saturação" value={50} max={100} unit="%" />
      <SliderField label="Desfoque" value={0} max={20} unit="px" />
    </Section>
    <Section title="Filtros">
      <div className="grid grid-cols-3 gap-2">
        {["Normal", "P&B", "Sépia", "Vintage", "Frio", "Quente"].map(f => (
          <Button key={f} variant={f === "Normal" ? "default" : "outline"} size="sm" className="text-[10px] h-7">
            {f}
          </Button>
        ))}
      </div>
    </Section>
  </>
);

const DefaultProperties = () => (
  <div className="flex flex-col items-center justify-center h-40 text-center">
    <p className="text-sm text-muted-foreground">Selecione uma ferramenta para ver suas propriedades</p>
  </div>
);

const toolNameMap: Record<ToolId, string> = {
  select: "Seleção", hand: "Mão", move: "Mover", rectangle: "Retângulo",
  ellipse: "Elipse", pen: "Caneta", text: "Texto", image: "Imagem",
  brush: "Pincel", eraser: "Borracha", eyedropper: "Conta-gotas",
  crop: "Recortar", rotate: "Rotacionar", scissors: "Tesoura",
  wand: "Varinha Mágica", layers: "Camadas", grid: "Grade", ruler: "Régua",
};

const EditorProperties = ({ activeTool }: EditorPropertiesProps) => {
  const renderProperties = () => {
    switch (activeTool) {
      case "select": case "hand": case "move":
        return <SelectionProperties />;
      case "rectangle": case "ellipse": case "pen":
        return <ShapeProperties />;
      case "text":
        return <TextProperties />;
      case "brush": case "eraser": case "eyedropper":
        return <BrushProperties />;
      case "crop": case "rotate": case "scissors": case "wand":
        return <TransformProperties />;
      case "image":
        return <ImageProperties />;
      default:
        return <DefaultProperties />;
    }
  };

  return (
    <div className="w-64 lg:w-72 border-l border-border bg-card shrink-0 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-border shrink-0">
        <h2 className="text-sm font-semibold text-foreground">{toolNameMap[activeTool]}</h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">Propriedades da ferramenta</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {renderProperties()}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorProperties;
