import { useState } from "react";
import type { PanelId } from "./EditorSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { X, Pencil, Palette, Tag, Image, Trash2, Heart, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";

interface EditorPanelProps {
  activePanel: PanelId;
  onClose: () => void;
  isMobile?: boolean;
}

const panelTitles: Record<PanelId, string> = {
  temas: "Temas",
  produtos: "Produtos",
  rodape: "Rodapé",
  imagens: "Imagens",
  logo: "Logo",
  fontes: "Fontes",
};

/* ---- Desktop Product Card (full) ---- */
const ProductCard = () => (
  <div className="border border-border rounded-xl p-4">
    <div className="border border-primary/20 rounded-xl p-4 bg-primary/[0.02]">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="w-28 h-28 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
            <div className="w-20 h-20 rounded-md bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Image className="w-8 h-8 text-muted-foreground/50" />
            </div>
          </div>
          <button className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors">
            <Image className="w-3 h-3" />
            Ver mais imagens
          </button>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          {[
            { icon: Pencil, label: "Editar informações" },
            { icon: Palette, label: "Cores e estilos" },
            { icon: Tag, label: "Alterar imagem" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary py-1 transition-colors">
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
          <div className="flex items-center gap-2.5 py-1">
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Selo +18</span>
            <Switch className="scale-75 ml-auto" />
          </div>
          <button className="flex items-center gap-2.5 text-sm text-destructive hover:text-destructive/80 py-1 transition-colors mt-1">
            <Trash2 className="w-4 h-4" />
            <span className="font-medium">Remover produto</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ---- Mobile Product Card (compact list item) ---- */
const MobileProductCard = ({ index }: { index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Compact row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-md bg-muted/50 border border-border flex items-center justify-center shrink-0">
          <Image className="w-5 h-5 text-muted-foreground/50" />
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm font-medium text-foreground">Produto {index + 1}</span>
          <span className="text-[11px] text-muted-foreground block">Automático · Cartaz</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expandable options */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1 border-t border-border pt-2">

              {[
                { icon: Pencil, label: "Editar informações", color: "text-foreground" },
                { icon: Palette, label: "Cores e estilos", color: "text-foreground" },
                { icon: Tag, label: "Alterar imagem", color: "text-foreground" },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className={`flex items-center gap-2 text-xs ${color} hover:text-primary py-1.5 w-full transition-colors`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              <div className="flex items-center gap-2 py-1.5">
                <Heart className="w-3.5 h-3.5 text-destructive" />
                <span className="text-xs font-medium text-foreground">Selo +18</span>
                <Switch className="scale-[0.6] ml-auto" />
              </div>
              <button className="flex items-center gap-2 text-xs text-destructive hover:text-destructive/80 py-1.5 w-full transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                <span className="font-medium">Remover produto</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---- Panel contents ---- */
const GeneralProductConfig = ({ isMobile }: { isMobile?: boolean }) => (
  <div className="flex items-center justify-between flex-wrap gap-2 p-3 border border-border rounded-lg bg-muted/30">
    <div className="flex items-center gap-2">
      <span className={`${isMobile ? "text-[11px]" : "text-xs"} text-muted-foreground`}>Encarte</span>
      <Switch defaultChecked className={isMobile ? "scale-[0.6]" : "scale-75"} />
      <span className={`${isMobile ? "text-[11px]" : "text-xs"} font-medium text-foreground`}>Cartaz</span>
    </div>
    <div className="flex items-center gap-2">
      <span className={`${isMobile ? "text-[11px]" : "text-xs"} text-muted-foreground`}>Modo:</span>
      <Select defaultValue="automatico">
        <SelectTrigger className={`${isMobile ? "h-6 text-[11px] w-20" : "h-7 text-xs w-24"} border-primary`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="automatico">Automático</SelectItem>
          <SelectItem value="manual">Manual</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const ProdutosContent = ({ isMobile }: { isMobile?: boolean }) => (
  <div className="space-y-3">
    <GeneralProductConfig isMobile={isMobile} />
    {isMobile ? (
      <MobileProductCard index={0} />
    ) : (
      <ProductCard />
    )}
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
        + PRODUTO
      </Button>
      <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
        + LISTA
      </Button>
      <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
        + OPÇÕES
      </Button>
    </div>
  </div>
);

const TemasContent = () => (
  <div className="grid grid-cols-2 gap-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="aspect-[3/4] rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all"
      />
    ))}
  </div>
);

const PlaceholderContent = ({ text }: { text: string }) => (
  <p className="text-sm text-muted-foreground">{text}</p>
);

const EditorPanel = ({ activePanel, onClose, isMobile }: EditorPanelProps) => {
  const panelContent: Record<PanelId, React.ReactNode> = {
    temas: <TemasContent />,
    produtos: <ProdutosContent isMobile={isMobile} />,
    rodape: <PlaceholderContent text="Configure o rodapé da sua oferta aqui." />,
    imagens: <PlaceholderContent text="Gerencie as imagens do seu template." />,
    logo: <PlaceholderContent text="Configure o logo aqui." />,
    fontes: <PlaceholderContent text="Configure as fontes aqui." />,
  };

  return (
    <div className={`${isMobile ? "w-full" : "w-80 lg:w-96"} h-full bg-card ${isMobile ? "border-t rounded-t-2xl" : "border-l"} border-border flex flex-col`}>
      {/* Drag handle for mobile */}
      {isMobile && (
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>
      )}

      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border shrink-0">
        <h2 className="text-sm font-semibold text-foreground">{panelTitles[activePanel]}</h2>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Panel body */}
      <ScrollArea className="flex-1">
        <div className={isMobile ? "p-3 pb-20" : "p-4"}>
          {panelContent[activePanel]}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPanel;
