import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Palette, ShoppingBag, FileText, ImageIcon, Stamp, Type, Save, FolderOpen, LogOut, MoreHorizontal
} from "lucide-react";
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

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* ===== DESKTOP: dark vertical sidebar ===== */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden md:flex w-56 lg:w-60 shrink-0 flex-col items-center py-6 px-4 bg-[hsl(270,20%,8%)] border-r border-[hsl(270,15%,15%)]"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-1.5 mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--header-start), var(--header-end))' }}
          >
            <span className="text-2xl">🏷️</span>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">
            Crie Oferta
          </h2>
        </div>

        {/* Main menu */}
        <motion.nav variants={container} initial="hidden" animate="show" className="flex flex-col gap-2 w-full flex-1">
          {items.map((sidebarItem) => {
            const Icon = sidebarItem.icon;
            const isActive = activePanel === sidebarItem.id;
            return (
              <motion.button
                key={sidebarItem.id}
                variants={itemAnim}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(sidebarItem)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "border-primary/60 bg-primary/15 text-white"
                    : "border-[hsl(270,15%,20%)] text-[hsl(0,0%,75%)] hover:border-primary/40 hover:text-white hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {sidebarItem.label}
              </motion.button>
            );
          })}
        </motion.nav>

        {/* Action items */}
        <div className="flex flex-col gap-2 w-full pt-4 mt-4 border-t border-[hsl(270,15%,15%)]">
          {actionItems.map((sidebarItem) => {
            const Icon = sidebarItem.icon;
            const isExit = sidebarItem.id === "sair";
            return (
              <motion.button
                key={sidebarItem.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(sidebarItem)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  isExit
                    ? "border-[hsl(270,15%,20%)] text-[hsl(0,0%,60%)] hover:border-destructive/50 hover:text-destructive hover:bg-destructive/10"
                    : "border-[hsl(270,15%,20%)] text-[hsl(0,0%,75%)] hover:border-primary/40 hover:text-white hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {sidebarItem.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

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
                  isActive ? "text-primary" : "text-muted-foreground"
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
    </>
  );
};

export default EditorSidebar;
