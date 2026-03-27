import { motion } from "framer-motion";
import { CloudUpload, Download, Save, Share2, ZoomOut, ZoomIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const actions = [
  { id: "cloud", label: "Salvar na nuvem", icon: CloudUpload },
  { id: "download", label: "Download", icon: Download },
  { id: "save", label: "Salvar", icon: Save },
  { id: "share", label: "Compartilhar", icon: Share2 },
  { id: "zoom-out", label: "Zoom −", icon: ZoomOut },
  { id: "zoom-in", label: "Zoom +", icon: ZoomIn },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

const EditorActionBar = () => (
  <TooltipProvider delayDuration={200}>
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="hidden md:flex w-12 shrink-0 flex-col items-center justify-center gap-1.5 py-4 bg-muted/60 border-r border-border"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Tooltip key={action.id}>
            <TooltipTrigger asChild>
              <motion.button
                variants={item}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <Icon className="w-[18px] h-[18px]" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {action.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </motion.div>
  </TooltipProvider>
);

export default EditorActionBar;
