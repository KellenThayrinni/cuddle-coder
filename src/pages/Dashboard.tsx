import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import SearchBanner from "@/components/dashboard/SearchBanner";
import ThemeSlider from "@/components/dashboard/ThemeSlider";
import TutorialModal from "@/components/dashboard/TutorialModal";
import TutorialArrow from "@/components/dashboard/TutorialArrow";
import LoginAnnouncementPopup from "@/components/dashboard/LoginAnnouncementPopup";
import MenuSection from "@/components/dashboard/MenuSection";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showTutorial, setShowTutorial] = useState(true);
  const [showArrow, setShowArrow] = useState(false);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setShowArrow(true);
    setTimeout(() => setShowArrow(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop only */}
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <LoginAnnouncementPopup />
        <TutorialModal open={showTutorial} onClose={handleCloseTutorial} />
        <AnimatePresence>
          <TutorialArrow show={showArrow} />
        </AnimatePresence>
        <SearchBanner />

        {/* Mobile menu - only visible on small screens */}
        <div className="md:hidden">
          <MenuSection />
        </div>

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
    </div>
  );
};

export default Dashboard;
