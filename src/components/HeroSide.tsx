import heroPerson from "@/assets/hero-person.png";
import cartazes from "@/assets/cartazes.png";
import { Zap, Sparkles, Briefcase } from "lucide-react";

const HeroSide = () => {
  return (
    <div className="relative w-full h-full hero-gradient overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Background large text */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
        <p className="text-[8vw] lg:text-[6rem] font-black leading-[0.9] tracking-tight text-primary-foreground/10 uppercase px-6 pb-8">
          DEIXE<br />A PÁSCOA<br />ADOÇAR<br />SUAS<br />VENDAS!
        </p>
      </div>

      {/* Logo */}
      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl border-2 border-primary-foreground/40 flex items-center justify-center">
            <span className="text-2xl">🏷️</span>
          </div>
        </div>
        <h1 className="text-2xl font-extrabold text-primary-foreground mt-2 hero-text-overlay">
          Crie Oferta
        </h1>
      </div>

      {/* Cartazes image */}
      <div className="relative z-10 px-8 -mt-4">
        <img
          src={cartazes}
          alt="Cartazes de ofertas"
          className="w-52 lg:w-64 drop-shadow-2xl"
          loading="lazy"
          width={512}
          height={512}
        />
      </div>

      {/* Main text */}
      <div className="relative z-10 px-8 mt-auto">
        <p className="text-xl md:text-2xl font-bold text-primary-foreground leading-snug hero-text-overlay max-w-xs">
          Crie cartazes de ofertas com qualidade e facilidade.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-primary-foreground/20">
            <Zap className="w-3.5 h-3.5" /> Rápido
          </span>
          <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-primary-foreground/20">
            <Sparkles className="w-3.5 h-3.5" /> Profissional
          </span>
          <span className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-primary-foreground/20">
            <Briefcase className="w-3.5 h-3.5" /> Para seu negócio
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 pb-4">
        <p className="text-[10px] text-primary-foreground/50">
          ©2026 crieoferta.com — Todos os direitos reservados.
        </p>
      </div>

      {/* Person image */}
      <img
        src={heroPerson}
        alt="Profissional Crie Oferta"
        className="absolute right-0 bottom-0 h-[85%] object-cover object-top pointer-events-none select-none opacity-80 mix-blend-luminosity"
        width={768}
        height={1024}
      />
    </div>
  );
};

export default HeroSide;
