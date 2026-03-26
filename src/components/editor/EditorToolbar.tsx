import { useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointer2, Hand, Square, Circle, Pen, Type, Image, Eraser,
  Paintbrush, Pipette, Crop, Move, RotateCcw, Wand2, Scissors,
  Layers, Grid3X3, Ruler
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ToolId =
  | "select" | "hand" | "rectangle" | "ellipse" | "pen" | "text"
  | "image" | "eraser" | "brush" | "eyedropper" | "crop" | "move"
  | "rotate" | "wand" | "scissors" | "layers" | "grid" | "ruler";

interface Tool {
  id: ToolId;
  label: string;
  icon: React.ElementType;
  group: string;
}

const tools: Tool[] = [
  { id: "select", label: "Seleção", icon: MousePointer2, group: "navigation" },
  { id: "hand", label: "Mão", icon: Hand, group: "navigation" },
  { id: "move", label: "Mover", icon: Move, group: "navigation" },
  { id: "rectangle", label: "Retângulo", icon: Square, group: "shapes" },
  { id: "ellipse", label: "Elipse", icon: Circle, group: "shapes" },
  { id: "pen", label: "Caneta", icon: Pen, group: "shapes" },
  { id: "text", label: "Texto", icon: Type, group: "content" },
  { id: "image", label: "Imagem", icon: Image, group: "content" },
  { id: "brush", label: "Pincel", icon: Paintbrush, group: "paint" },
  { id: "eraser", label: "Borracha", icon: Eraser, group: "paint" },
  { id: "eyedropper", label: "Conta-gotas", icon: Pipette, group: "paint" },
  { id: "crop", label: "Recortar", icon: Crop, group: "transform" },
  { id: "rotate", label: "Rotacionar", icon: RotateCcw, group: "transform" },
  { id: "scissors", label: "Tesoura", icon: Scissors, group: "transform" },
  { id: "wand", label: "Varinha Mágica", icon: Wand2, group: "transform" },
  { id: "layers", label: "Camadas", icon: Layers, group: "view" },
  { id: "grid", label: "Grade", icon: Grid3X3, group: "view" },
  { id: "ruler", label: "Régua", icon: Ruler, group: "view" },
];

const groupOrder = ["navigation", "shapes", "content", "paint", "transform", "view"];

interface EditorToolbarProps {
  activeTool: ToolId;
  onToolChange: (tool: ToolId) => void;
}

const EditorToolbar = ({ activeTool, onToolChange }: EditorToolbarProps) => {
  const groupedTools = groupOrder.map(group => tools.filter(t => t.group === group));

  return (
    <TooltipProvider delayDuration={200}>
      <ScrollArea className="w-14 bg-card border-r border-border shrink-0">
        <div className="flex flex-col items-center gap-1 py-3 px-1.5">
          {groupedTools.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <Separator className="my-1.5 w-8 mx-auto" />}
              <div className="flex flex-col items-center gap-0.5">
                {group.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = activeTool === tool.id;
                  return (
                    <Tooltip key={tool.id}>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onToolChange(tool.id)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 ${
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-[18px] h-[18px]" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="text-xs">
                        {tool.label}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
};

export default EditorToolbar;
