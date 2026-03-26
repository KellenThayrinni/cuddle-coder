import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditorCanvas = () => {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-muted/30 min-w-0">
      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg shadow-xl border border-border relative"
          style={{
            width: `${6 * zoom / 100}in`,
            height: `${4 * zoom / 100}in`,
            minWidth: 260,
            minHeight: 180,
            maxWidth: "100%",
          }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Center guide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground px-4 text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                <span className="text-xl md:text-2xl">🎨</span>
              </div>
              <p className="text-xs font-medium">Área de trabalho</p>
              <p className="text-[10px]">Selecione uma opção no menu à esquerda</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom zoom bar */}
      <div className="h-8 md:h-9 border-t border-border bg-card flex items-center justify-between px-3 md:px-4 shrink-0">
        <span className="text-[10px] text-muted-foreground hidden sm:inline">
          Canvas: 1920 × 1080px
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setZoom(Math.max(25, zoom - 10))}>
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-[10px] text-muted-foreground w-10 text-center font-medium">{zoom}%</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setZoom(Math.min(300, zoom + 10))}>
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1" onClick={() => setZoom(100)}>
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
