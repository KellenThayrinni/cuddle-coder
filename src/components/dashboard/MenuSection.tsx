import { Zap, Video, Sparkles, GraduationCap, CreditCard, Lightbulb, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick?: () => void;
}

const MenuSection = () => {
  const navigate = useNavigate();

  const integrations: MenuItem[] = [
    { icon: <Zap className="h-5 w-5" />, label: "ArtesTurbo", color: "bg-primary" },
    { icon: <Video className="h-5 w-5" />, label: "VídeoOferta", color: "bg-accent" },
  ];

  const categories: MenuItem[] = [
    { icon: <Sparkles className="h-5 w-5" />, label: "Vídeos com I.A", color: "bg-primary" },
    { icon: <GraduationCap className="h-5 w-5" />, label: "Vídeo Aulas", color: "bg-secondary text-secondary-foreground" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Assinatura", color: "bg-accent" },
    { icon: <Lightbulb className="h-5 w-5" />, label: "Sugestão de Temas", color: "bg-muted text-muted-foreground" },
    { icon: <LogOut className="h-5 w-5" />, label: "Sair", color: "bg-destructive", onClick: () => navigate("/") },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="px-4 md:px-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Integrações */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Integrações</h2>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap gap-3">
          {integrations.map((m) => (
            <motion.button
              key={m.label}
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={m.onClick}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${m.color} text-primary-foreground transition-shadow hover:shadow-md`}
            >
              {m.icon}
              {m.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Categorias */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categorias</h2>
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-wrap gap-3">
          {categories.map((m) => (
            <motion.button
              key={m.label}
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={m.onClick}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${m.color} ${m.color.includes("text-") ? "" : "text-primary-foreground"} transition-shadow hover:shadow-md`}
            >
              {m.icon}
              {m.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuSection;
