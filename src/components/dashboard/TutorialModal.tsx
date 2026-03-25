import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tutorials = [
  { title: "Tutorial CrieOferta", videoId: "dQw4w9WgXcQ" },
  { title: "Tutorial Artes Turbo", videoId: "dQw4w9WgXcQ" },
  { title: "Tutorial VideoOferta", videoId: "dQw4w9WgXcQ" },
];

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

const TutorialModal = ({ open, onClose }: TutorialModalProps) => {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((p) => Math.min(p + 1, tutorials.length - 1));
  const goPrev = () => setCurrent((p) => Math.max(p - 1, 0));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-card border-border">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-foreground">
            {tutorials[current].title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Vídeo {current + 1} de {tutorials.length}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="aspect-video w-full rounded-xl overflow-hidden bg-muted"
            >
              <iframe
                src={`https://www.youtube.com/embed/${tutorials[current].videoId}?rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={tutorials[current].title}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 pt-3">
          {tutorials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={goPrev}
            disabled={current === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Anterior
          </Button>

          {current === tutorials.length - 1 ? (
            <Button onClick={onClose} className="bg-primary text-primary-foreground gap-1">
              Concluir <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={goNext} className="bg-primary text-primary-foreground gap-1">
              Próximo <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
