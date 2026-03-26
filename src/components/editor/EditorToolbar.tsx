import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

const EditorToolbar = () => {
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxProducts, setMaxProducts] = useState("12");

  const addPage = () => {
    const newPage = pages.length + 1;
    setPages([...pages, newPage]);
    setCurrentPage(newPage);
  };

  const removePage = () => {
    if (pages.length <= 1) return;
    const newPages = pages.slice(0, -1);
    setPages(newPages);
    if (currentPage > newPages.length) {
      setCurrentPage(newPages.length);
    }
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  return (
    <TooltipProvider delayDuration={200}>
      {/* Desktop: vertical strip */}
      <div className="hidden md:flex w-[52px] bg-card border-r border-border shrink-0 flex-col items-center py-3 gap-3">
        {/* Page navigation */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">Pág.</span>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                onClick={goToPrev}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Página anterior</TooltipContent>
          </Tooltip>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-sm"
            >
              {currentPage}
            </motion.div>
          </AnimatePresence>

          <span className="text-[9px] text-muted-foreground">de {pages.length}</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                onClick={goToNext}
                disabled={currentPage >= pages.length}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Próxima página</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-7 h-px bg-border" />

        {/* Add / Remove page */}
        <div className="flex flex-col items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={addPage}
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Adicionar página</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={removePage}
                disabled={pages.length <= 1}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Remover última página</TooltipContent>
          </Tooltip>
        </div>

        <div className="w-7 h-px bg-border" />

        {/* Products per page */}
        <div className="flex flex-col items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground">
                <LayoutGrid className="w-4 h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">Produtos por página</TooltipContent>
          </Tooltip>

          <Select value={maxProducts} onValueChange={setMaxProducts}>
            <SelectTrigger className="w-10 h-8 px-1 text-xs font-semibold border-border bg-muted/50 rounded-lg justify-center [&>svg]:hidden text-center">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="right" align="start" className="min-w-[120px]">
              {[4, 6, 8, 10, 12, 16, 20, 24].map((n) => (
                <SelectItem key={n} value={String(n)} className="text-xs">
                  {n} produtos
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-[8px] text-muted-foreground leading-tight text-center">Máx.</span>
        </div>
      </div>

      {/* Mobile: horizontal strip above canvas */}
      <div className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={goToPrev}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>

          <div className="flex items-center gap-1 bg-muted/50 rounded-lg px-2 py-1">
            <span className="text-xs font-semibold">{currentPage}</span>
            <span className="text-[10px] text-muted-foreground">/ {pages.length}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={goToNext}
            disabled={currentPage >= pages.length}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
            onClick={addPage}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            onClick={removePage}
            disabled={pages.length <= 1}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="w-px h-5 bg-border" />

        <div className="flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-muted-foreground" />
          <Select value={maxProducts} onValueChange={setMaxProducts}>
            <SelectTrigger className="h-7 w-[80px] px-2 text-xs border-border bg-muted/50 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-[120px]">
              {[4, 6, 8, 10, 12, 16, 20, 24].map((n) => (
                <SelectItem key={n} value={String(n)} className="text-xs">
                  {n} produtos
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EditorToolbar;
