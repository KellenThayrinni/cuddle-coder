import { useState } from "react";
import { Monitor, RefreshCw, Code2, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const colorPresets = [
  { id: "descricao", label: "Descrição", color: "#1a1a2e" },
  { id: "fundo", label: "Fundo", color: "#dc2626" },
  { id: "preco", label: "Preço", color: "#dc2626" },
  { id: "balao", label: "Balão", color: "#facc15" },
];

const ColorSwatch = ({
  label,
  color,
  isMobile,
}: {
  label: string;
  color: string;
  isMobile?: boolean;
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <span
      className={`${isMobile ? "text-[10px]" : "text-[11px]"} font-semibold text-muted-foreground uppercase tracking-wide`}
    >
      {label}
    </span>
    <button
      className="rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md group"
      style={{ backgroundColor: color }}
    >
      <div
        className={`${isMobile ? "w-14 h-14" : "w-16 h-16"} rounded-[10px] transition-transform group-hover:scale-95`}
      />
    </button>
  </div>
);

const TvContent = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
          <Monitor className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3
            className={`${isMobile ? "text-sm" : "text-[15px]"} font-bold text-foreground`}
          >
            Oferta TV
          </h3>
          <p
            className={`${isMobile ? "text-[10px]" : "text-[11px]"} text-muted-foreground leading-tight`}
          >
            Ajuste as cores e o estilo visual exclusivos do modo TV.
          </p>
        </div>
      </div>

      {/* Color Swatches */}
      <div className="p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-around gap-2">
          {colorPresets.map((c) => (
            <ColorSwatch
              key={c.id}
              label={c.label}
              color={c.color}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
        <Button
          className="rounded-xl h-10 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar Preview
        </Button>
        <Button
          variant="outline"
          className="rounded-xl h-10 gap-2 border-primary text-primary hover:bg-primary/5 font-semibold text-xs"
        >
          <Code2 className="w-4 h-4" />
          Gerar Código
        </Button>
      </div>

      {/* Logos Button */}
      <Button
        variant="outline"
        className="w-full rounded-xl h-10 gap-2 border-primary text-primary hover:bg-primary/5 font-semibold text-xs"
      >
        <Image className="w-4 h-4" />
        Logos
      </Button>
    </div>
  );
};

export default TvContent;
