import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Palette, ShoppingBag, FileText, ImageIcon, Stamp, Type, Save, LogOut
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type PanelId = "temas" | "produtos" | "rodape" | "imagens" | "logo" | "fontes";

interface SidebarItem {
  id: PanelId | "salvar" | "sair";
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
  { id: "sair", label: "Sair", icon: LogOut, isAction: true },
];

interface EditorSidebarProps {
  activePanel: PanelId | null;
  onPanelChange: (panel: PanelId) => void;
}

const EditorSidebar = ({ activePanel, onPanelChange }: EditorSidebarProps) => {
  const navigate = useNavigate();

  const handleClick = (item: SidebarItem) => {
    if (item.id === "sair") {
      navigate("/dashboard");
    } else if (item.id === "salvar") {
      // TODO: save logic
    } else {
      onPanelChange(item.id as PanelId);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-16 md:w-[72px] bg-card border-r border-border shrink-0 flex flex-col">
        {/* Logo */}
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
                  <TooltipContent side="right" className="text-xs md:block hidden">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </ScrollArea>

        {/* Bottom actions */}
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
                <TooltipContent side="right" className="text-xs md:block hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EditorSidebar;
