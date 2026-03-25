import heroPerson from "@/assets/hero-person.png";
import cartazes from "@/assets/cartazes.png";
import { Zap, Sparkles, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const HeroSide = () => {
  return (
    <div className="relative w-full h-full hero-gradient overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Background large text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-[8vw] lg:text-[6rem] font-black leading-[0.9] tracking-tight text-primary-foreground/10 uppercase px-6 pb-8"
        >
          DEIXE<br />A PÁSCOA<br />ADOÇAR<br />SUAS<br />VENDAS!
        </motion.p>
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl border-2 border-primary-foreground/40 flex items-center justify-center">
            <span className="text-2xl">🏷️</span>
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-primary-foreground mt-2 hero-text-overlay">
          Crie Oferta
        </h1>
      </motion.div>

      {/* Cartazes image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        className="relative z-10 px-8 -mt-4"
      >
        <img
          src={cartazes}
          alt="Cartazes de ofertas"
          className="w-52 lg:w-64 drop-shadow-2xl"
          loading="lazy"
          width={512}
          height={512}
        />
      </motion.div>

      {/* Main text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 px-8 mt-auto"
      >
        <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-snug hero-text-overlay max-w-xs">
          Crie cartazes de ofertas com qualidade e facilidade.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5 mb-6">
          {[
            { icon: Zap, label: "Rápido" },
            { icon: Sparkles, label: "Profissional" },
            { icon: Briefcase, label: "Para seu negócio" },
          ].map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-primary-foreground/20"
            >
              <tag.icon className="w-3.5 h-3.5" /> {tag.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative z-10 px-8 pb-4"
      >
        <p className="text-[10px] text-primary-foreground/50">
          ©2026 crieoferta.com — Todos os direitos reservados.
        </p>
      </motion.div>

      {/* Person image */}
      <motion.img
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        src={heroPerson}
        alt="Profissional Crie Oferta"
        className="absolute right-0 bottom-0 h-[85%] object-cover object-top pointer-events-none select-none mix-blend-luminosity"
        width={768}
        height={1024}
      />
    </div>
  );
};

export default HeroSide;
