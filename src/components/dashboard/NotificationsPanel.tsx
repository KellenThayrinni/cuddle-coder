import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Announcement,
  getAnnouncements,
  getSeenIds,
  markAsSeen,
  getUnseenCount,
} from "@/lib/announcements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsPanel = ({ open, onOpenChange }: Props) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Announcement | null>(null);

  useEffect(() => {
    if (open) {
      setAnnouncements(getAnnouncements());
      setSeenIds(new Set(getSeenIds()));
    }
  }, [open]);

  const handleClick = (a: Announcement) => {
    markAsSeen(a.id);
    setSeenIds((prev) => new Set([...prev, a.id]));
    setSelected(a);
  };

  if (!open) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-full mt-2 w-80 bg-card border border-border/50 rounded-xl shadow-lg overflow-hidden z-50"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Novidades</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {announcements.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma novidade no momento
            </div>
          ) : (
            announcements.map((a, i) => {
              const isNew = !seenIds.has(a.id);
              return (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleClick(a)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0 ${
                    isNew ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-xl shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{a.title}</span>
                      {isNew && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{a.text}</p>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Detail popup */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          {selected && (
            <>
              <DialogHeader className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
                  {selected.icon}
                </div>
                <DialogTitle className="text-lg">{selected.title}</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed whitespace-pre-wrap">
                  {selected.text}
                </DialogDescription>
              </DialogHeader>
              <div className="text-center pt-2">
                <span className="text-[11px] text-muted-foreground">
                  {new Date(selected.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationsPanel;
