import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const EditorToolbar = () => {
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxProducts, setMaxProducts] = useState("12");

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-3 px-3 md:px-4 py-1.5 bg-card border-b border-border shrink-0">
      {/* Page navigation */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide hidden sm:inline">Página</span>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={goToPrev}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="min-w-[52px] h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold"
          >
            {currentPage} / {pages.length}
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={goToNext}
          disabled={currentPage >= pages.length}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="w-px h-5 bg-border" />

      {/* Products per page */}
      <div className="flex items-center gap-1.5">
        <LayoutGrid className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide hidden sm:inline whitespace-nowrap">Produtos por página</span>
        <Select value={maxProducts} onValueChange={setMaxProducts}>
          <SelectTrigger className="h-7 w-[72px] px-2 text-xs border-border bg-muted/50 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="min-w-[130px]">
            {[4, 6, 8, 10, 12, 16, 20, 24].map((n) => (
              <SelectItem key={n} value={String(n)} className="text-xs">
                {n} produtos
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EditorToolbar;
