import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Palette, ShoppingBag, FileText, ImageIcon, Stamp, Type, Save, FolderOpen, LogOut, MoreHorizontal
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProjectManagerModal from "./ProjectManagerModal";

export type PanelId = "temas" | "produtos" | "rodape" | "imagens" | "logo" | "fontes";

interface SidebarItem {
  id: PanelId | "salvar" | "carregar" | "sair";
  label: string;
  icon: React.ElementType;
  isAction?: boolean;
}

const items: SidebarItem[] = [
  { id: "temas", label: "Temas", icon: Palette },
  { id: "produtos", label: "Produtos", icon: ShoppingBag },
  { id: "rodape", label: "Rodapé", icon: FileText },
  { id: "imagens", label: "Imagens", icon: ImageIcon },
  { id: "logo", label: "Logo", icon: Stamp },
  { id: "fontes", label: "Fontes", icon: Type },
];

const actionItems: SidebarItem[] = [
  { id: "salvar", label: "Salvar", icon: Save, isAction: true },
  { id: "carregar", label: "Carregar", icon: FolderOpen, isAction: true },
  { id: "sair", label: "Sair", icon: LogOut, isAction: true },
];

// Mobile bottom bar: show first 4 items + "Mais" overflow
const mobileVisibleItems = items.slice(0, 4);
const mobileOverflowItems: SidebarItem[] = [...items.slice(4), ...actionItems];

interface EditorSidebarProps {
  activePanel: PanelId | null;
  onPanelChange: (panel: PanelId) => void;
}

const EditorSidebar = ({ activePanel, onPanelChange }: EditorSidebarProps) => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState<"save" | "load" | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleClick = (item: SidebarItem) => {
    if (item.id === "sair") {
      navigate("/dashboard");
    } else if (item.id === "salvar") {
      setModalMode("save");
    } else if (item.id === "carregar") {
      setModalMode("load");
    } else {
      onPanelChange(item.id as PanelId);
    }
    setMoreOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      {/* ===== DESKTOP: vertical sidebar ===== */}
      <div className="hidden md:flex w-[72px] bg-card border-r border-border shrink-0 flex-col">
        <div className="flex items-center justify-center py-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
          >
            <span className="text-white text-[10px] font-bold">CO</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col items-center gap-1 px-1.5 py-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activePanel === item.id;
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleClick(item)}
                      className={`w-full flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="leading-none">{item.label}</span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="text-xs">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex flex-col items-center gap-1 px-1.5 py-3 border-t border-border">
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleClick(item)}
                    className={`w-full flex flex-col items-center gap-1 py-2.5 rounded-xl text-[10px] font-medium transition-all ${
                      item.id === "sair"
                        ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="leading-none">{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      {/* ===== MOBILE: floating bottom bar ===== */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-2 py-1.5 flex items-center justify-around gap-0.5">
          {mobileVisibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClick(item)}
                className={`relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl text-[10px] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="leading-none relative z-10">{item.label}</span>
              </motion.button>
            );
          })}

          {/* More button with popover */}
          <Popover open={moreOpen} onOpenChange={setMoreOpen}>
            <PopoverTrigger asChild>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl text-[10px] font-medium text-muted-foreground transition-all"
              >
                <MoreHorizontal className="w-5 h-5" />
                <span className="leading-none">Mais</span>
              </motion.button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="end"
              sideOffset={12}
              className="w-48 p-1.5 rounded-xl border-border bg-card/95 backdrop-blur-xl shadow-xl"
            >
              <div className="flex flex-col gap-0.5">
                {mobileOverflowItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePanel === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : item.id === "sair"
                            ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <ProjectManagerModal
        open={modalMode !== null}
        onClose={() => setModalMode(null)}
        mode={modalMode ?? "load"}
      />
    </TooltipProvider>
  );
};

export default EditorSidebar;
