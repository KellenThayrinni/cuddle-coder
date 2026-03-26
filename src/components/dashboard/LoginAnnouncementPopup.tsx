import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Announcement,
  getLoginPopupAnnouncements,
  markPopupSeen,
} from "@/lib/announcements";

const LoginAnnouncementPopup = () => {
  const [queue, setQueue] = useState<Announcement[]>([]);
  const [current, setCurrent] = useState<Announcement | null>(null);

  useEffect(() => {
    const popups = getLoginPopupAnnouncements();
    if (popups.length > 0) {
      setQueue(popups.slice(1));
      setCurrent(popups[0]);
    }
  }, []);

  const handleDismiss = () => {
    if (current) markPopupSeen(current.id);
    if (queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(queue.slice(1));
    } else {
      setCurrent(null);
    }
  };

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl border border-border/50 shadow-xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent bar */}
            <div className="h-1 btn-gradient" />

            <div className="p-6 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl"
              >
                {current.icon}
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-foreground">{current.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {current.text}
                </p>
              </div>

              <Button
                onClick={handleDismiss}
                className="w-full btn-gradient text-primary-foreground rounded-xl h-10 text-sm font-medium"
              >
                Entendi!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginAnnouncementPopup;
