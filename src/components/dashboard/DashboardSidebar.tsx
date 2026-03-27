import { ImageIcon, GraduationCap, CreditCard, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarMenuItem {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const DashboardSidebar = () => {
  const navigate = useNavigate();

  const menuItems: SidebarMenuItem[] = [
    { icon: ImageIcon, label: "Temas", onClick: () => {} },
    { icon: GraduationCap, label: "Vídeo Aulas", onClick: () => {} },
    { icon: CreditCard, label: "Assinatura", onClick: () => {} },
    { icon: LogOut, label: "Sair", onClick: () => navigate("/") },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:flex w-56 lg:w-64 shrink-0 flex-col items-center py-8 px-4 bg-[hsl(270,20%,8%)] border-r border-[hsl(270,15%,15%)] min-h-screen"
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--header-start), var(--header-end))' }}>
          <span className="text-3xl">🏷️</span>
        </div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Crie Oferta
        </h2>
      </div>

      {/* Menu */}
      <motion.nav variants={container} initial="hidden" animate="show" className="flex flex-col gap-2.5 w-full">
        {menuItems.map((menuItem) => {
          const Icon = menuItem.icon;
          const isExit = menuItem.label === "Sair";
          return (
            <motion.button
              key={menuItem.label}
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={menuItem.onClick}
              className={`flex items-center gap-3 w-full px-5 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                isExit
                  ? "border-[hsl(270,15%,25%)] text-[hsl(0,0%,70%)] hover:border-destructive/50 hover:text-destructive hover:bg-destructive/10"
                  : "border-[hsl(270,15%,25%)] text-[hsl(0,0%,85%)] hover:border-primary/50 hover:text-white hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              {menuItem.label}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <p className="text-[10px] text-[hsl(0,0%,35%)] text-center">
          © 2026 crieoferta.com
        </p>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
