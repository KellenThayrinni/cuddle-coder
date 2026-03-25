import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const SearchBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="hero-gradient rounded-2xl p-6 md:p-10 mx-4 md:mx-6 mt-4"
    >
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-xl md:text-3xl font-bold text-primary-foreground hero-text-overlay">
          Encontre o tema perfeito para sua oferta
        </h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar temas..."
            className="pl-12 h-12 rounded-xl bg-card/95 border-0 text-foreground placeholder:text-muted-foreground shadow-lg focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBanner;
