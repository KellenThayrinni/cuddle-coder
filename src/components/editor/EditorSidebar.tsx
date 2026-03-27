import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Video, CreditCard, LogOut } from "lucide-react";
import ProjectManagerModal from "./ProjectManagerModal";

export type PanelId = "temas" | "videoaulas" | "assinatura";

interface SidebarItem {
  id: PanelId | "sair";
  label: string;
  icon: React.ElementType;
}

const items: SidebarItem[] = [
  { id: "temas", label: "Temas", icon: Palette },
  { id: "videoaulas", label: "Vídeo Aulas", icon: Video },
  { id: "assinatura", label: "Assinatura", icon: CreditCard },
  { id: "sair", label: "Sair", icon: LogOut },
];

interface EditorSidebarProps {
  activePanel: PanelId | null;
  onPanelChange: (panel: PanelId) => void;
}

const EditorSidebar = ({ activePanel, onPanelChange }: EditorSidebarProps) => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState<"save" | "load" | null>(null);

  const handleClick = (item: SidebarItem) => {
    if (item.id === "sair") {
      navigate("/dashboard");
    } else {
      onPanelChange(item.id as PanelId);
    }
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

        {/* Menu */}
        <motion.nav variants={container} initial="hidden" animate="show" className="flex flex-col gap-2 w-full flex-1">
          {items.map((sidebarItem) => {
            const Icon = sidebarItem.icon;
            const isExit = sidebarItem.id === "sair";
            const isActive = !isExit && activePanel === sidebarItem.id;
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
                    : isExit
                      ? "border-[hsl(270,15%,20%)] text-[hsl(0,0%,60%)] hover:border-destructive/50 hover:text-destructive hover:bg-destructive/10"
                      : "border-[hsl(270,15%,20%)] text-[hsl(0,0%,75%)] hover:border-primary/40 hover:text-white hover:bg-primary/10"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {sidebarItem.label}
              </motion.button>
            );
          })}
        </motion.nav>
      </motion.div>

      {/* ===== MOBILE: floating bottom bar ===== */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-2 py-1.5 flex items-center justify-around gap-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isExit = item.id === "sair";
            const isActive = !isExit && activePanel === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleClick(item)}
                className={`relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl text-[10px] font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : isExit
                      ? "text-muted-foreground"
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
