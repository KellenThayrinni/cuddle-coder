import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ToolId } from "./EditorToolbar";

interface EditorCanvasProps {
  activeTool: ToolId;
}

const cursorMap: Partial<Record<ToolId, string>> = {
  select: "default",
  hand: "grab",
  move: "move",
  brush: "crosshair",
  eraser: "crosshair",
  eyedropper: "crosshair",
  text: "text",
  crop: "crosshair",
  pen: "crosshair",
  rectangle: "crosshair",
  ellipse: "crosshair",
};

const EditorCanvas = ({ activeTool }: EditorCanvasProps) => {
  const [zoom, setZoom] = useState(100);

  const cursor = cursorMap[activeTool] || "default";

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
      {/* Canvas area */}
      <div
        className="flex-1 flex items-center justify-center overflow-auto p-6"
        style={{ cursor }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg shadow-xl border border-border relative"
          style={{
            width: `${6 * zoom / 100}in`,
            height: `${4 * zoom / 100}in`,
            minWidth: 300,
            minHeight: 200,
          }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Center guide */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-xs font-medium">Área de trabalho</p>
              <p className="text-[10px]">Use as ferramentas à esquerda para criar</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom zoom bar */}
      <div className="h-9 border-t border-border bg-card flex items-center justify-between px-4 shrink-0">
        <span className="text-[10px] text-muted-foreground">
          Canvas: 1920 × 1080px
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setZoom(Math.max(25, zoom - 10))}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-[10px] text-muted-foreground w-10 text-center font-medium">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setZoom(Math.min(300, zoom + 10))}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 ml-1"
            onClick={() => setZoom(100)}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
