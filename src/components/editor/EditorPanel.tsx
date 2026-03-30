import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ShoppingBag, FileText, ImageIcon, X, MonitorSmartphone, Sparkles, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import RodapeContent from "./RodapeContent";
import TemasContent from "./TemasContent";
import ConfigContent from "./ConfigContent";
import TvContent from "./TvContent";
import ProductCard from "./ProductCard";

export type EditorTabId = "temas" | "produtos" | "rodape" | "imagens" | "config" | "tv";

interface EditorPanelProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const tabs: { id: EditorTabId; label: string; icon: React.ElementType }[] = [
  { id: "temas", label: "Temas", icon: Sparkles },
  { id: "produtos", label: "Produtos", icon: ShoppingBag },
  { id: "rodape", label: "Rodapé", icon: FileText },
  { id: "imagens", label: "Imagens", icon: ImageIcon },
  { id: "config", label: "Config", icon: Settings },
  { id: "tv", label: "TV", icon: MonitorSmartphone },
];

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
const MobileProductCard = ({ index, onViewResult }: { index: number; onViewResult?: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
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
              <button
                onClick={(e) => { e.stopPropagation(); onViewResult?.(); }}
                className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 py-1.5 w-full transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="font-medium">Ver resultado</span>
              </button>
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

const ProdutosContent = ({ isMobile, onClose }: { isMobile?: boolean; onClose?: () => void }) => (
  <div className="space-y-3">
    <GeneralProductConfig isMobile={isMobile} />
    {isMobile ? (
      <MobileProductCard index={0} onViewResult={onClose} />
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

const PlaceholderContent = ({ text }: { text: string }) => (
  <p className="text-sm text-muted-foreground">{text}</p>
);

const makeTabContent = (onClose?: () => void): Record<EditorTabId, (isMobile?: boolean) => React.ReactNode> => ({
  temas: (isMobile) => <TemasContent isMobile={isMobile} />,
  produtos: (isMobile) => <ProdutosContent isMobile={isMobile} onClose={onClose} />,
  rodape: (isMobile) => <RodapeContent isMobile={isMobile} />,
  imagens: () => <PlaceholderContent text="Gerencie as imagens do seu template." />,
  config: (isMobile) => <ConfigContent isMobile={isMobile} />,
  tv: (isMobile) => <TvContent isMobile={isMobile} />,
});

const formats = [
  { id: "a4", label: "A4", w: "w-8", h: "h-11" },
  { id: "a4-h", label: "A4", w: "w-11", h: "h-8" },
  { id: "storie", label: "Storie", w: "w-6", h: "h-10" },
  { id: "1080", label: "1080x1080", w: "w-9", h: "h-9" },
  { id: "feed", label: "Feed\nInstagram", w: "w-8", h: "h-10" },
  { id: "tv", label: "TV", w: "w-11", h: "h-7" },
  { id: "oferta-tv", label: "Oferta TV", w: "w-11", h: "h-7" },
  { id: "gondola", label: "Gôndola", w: "w-10", h: "h-5" },
  { id: "gancho", label: "Gancho", w: "w-8", h: "h-8" },
];

const FormatThumbnail = ({ format, isActive }: { format: typeof formats[0]; isActive: boolean }) => (
  <button
    className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all duration-200 w-full ${
      isActive ? "bg-primary/20" : "hover:bg-muted"
    }`}
  >
    <div
      className={`${format.w} ${format.h} rounded-sm border-2 transition-colors duration-200 ${
        isActive
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/30 bg-muted/50"
      }`}
    />
    <span className={`text-[9px] font-semibold leading-tight text-center whitespace-pre-line ${
      isActive ? "text-primary" : "text-muted-foreground"
    }`}>
      {format.label}
    </span>
  </button>
);

/* ---- Mobile format bar (horizontal, compact) ---- */
const MobileFormatBar = ({ activeFormat, onSelect }: { activeFormat: string; onSelect: (id: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const activeLabel = formats.find(f => f.id === activeFormat)?.label?.replace("\n", " ") ?? activeFormat;

  return (
    <div className="border-b border-border shrink-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MonitorSmartphone className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">Formato:</span>
          <span className="text-xs font-bold text-primary">{activeLabel}</span>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
              {formats.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => { onSelect(fmt.id); setExpanded(false); }}
                  className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg shrink-0 transition-all ${
                    activeFormat === fmt.id ? "bg-primary/15" : "hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`${fmt.w} ${fmt.h} rounded-sm border-2 transition-colors ${
                      activeFormat === fmt.id
                        ? "border-primary bg-primary/10"
                        : "border-muted-foreground/30 bg-muted/50"
                    }`}
                    style={{ transform: "scale(0.7)" }}
                  />
                  <span className={`text-[8px] font-semibold leading-tight text-center whitespace-pre-line ${
                    activeFormat === fmt.id ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {fmt.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- Panel wrapper --- */

const EditorPanel = ({ isMobile, onClose }: EditorPanelProps) => {
  const [activeTab, setActiveTab] = useState<EditorTabId>("produtos");
  const [activeFormat, setActiveFormat] = useState("a4");
  const tabContent = makeTabContent(onClose);

  return (
    <div className={`${isMobile ? "w-full h-full" : "w-80 lg:w-96 h-full"} flex flex-col`}>
      <div className={`flex-1 min-w-0 bg-card ${isMobile ? "" : "border-l"} border-border flex flex-col h-full`}>
        {/* Mobile header */}
        {isMobile && (
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border shrink-0">
            <span className="text-sm font-bold text-foreground">Painel</span>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted/50 transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Mobile: horizontal collapsible format selector */}
        {isMobile && (
          <MobileFormatBar activeFormat={activeFormat} onSelect={setActiveFormat} />
        )}

        {/* Tab navigation */}
        <div className="flex items-center gap-0.5 px-2 py-2 border-b border-border shrink-0 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab body */}
        <ScrollArea className="flex-1">
          <div className={isMobile ? "p-3 pb-20" : "p-4"}>
            {tabContent[activeTab](isMobile)}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default EditorPanel;
