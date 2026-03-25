import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchBanner from "@/components/dashboard/SearchBanner";
import MenuSection from "@/components/dashboard/MenuSection";
import ThemeSlider from "@/components/dashboard/ThemeSlider";
import { motion } from "framer-motion";

const gradients = [
  "bg-gradient-to-br from-primary to-accent",
  "bg-gradient-to-br from-accent to-primary",
  "bg-gradient-to-br from-primary/80 to-secondary",
  "bg-gradient-to-br from-accent/80 to-primary/60",
  "bg-gradient-to-br from-secondary to-primary",
  "bg-gradient-to-br from-primary to-muted",
];

const makeItems = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    title: `${prefix} Tema ${i + 1}`,
    gradient: gradients[i % gradients.length],
  }));

const sliders = [
  { title: "🔥 Escolhidos Recentemente", items: makeItems("recente", 8) },
  { title: "📅 Março", items: makeItems("março", 8) },
  { title: "💜 Mês da Mulher", items: makeItems("mulher", 8) },
  { title: "📈 Tendências", items: makeItems("tendência", 8) },
  { title: "🎨 Novos Temas", items: makeItems("novo", 8) },
  { title: "⭐ Mais Populares", items: makeItems("popular", 8) },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <SearchBanner />
      <MenuSection />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 pb-12 space-y-8"
      >
        {sliders.map((slider, i) => (
          <ThemeSlider key={slider.title} title={slider.title} items={slider.items} index={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
