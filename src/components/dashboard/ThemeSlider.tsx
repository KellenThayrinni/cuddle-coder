import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ThemeItem {
  id: string;
  title: string;
  gradient: string;
}

interface ThemeSliderProps {
  title: string;
  items: ThemeItem[];
  index: number;
}

const ThemeSlider = ({ title, items, index }: ThemeSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-4 md:px-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto px-4 md:px-6 pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="snap-start shrink-0 w-[200px] md:w-[240px] aspect-[3/4] rounded-2xl cursor-pointer overflow-hidden relative group"
          >
            <div className={`absolute inset-0 ${item.gradient} transition-all duration-300`} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm font-medium text-primary-foreground drop-shadow-lg">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ThemeSlider;
