import { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorActionBar from "@/components/editor/EditorActionBar";
import EditorToolbar from "@/components/editor/EditorToolbar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorPanel from "@/components/editor/EditorPanel";
import { useIsMobile } from "@/hooks/use-mobile";

const Editor = () => {
  const { themeId } = useParams();
  const isMobile = useIsMobile();
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop: sidebar + action bar */}
        <EditorSidebar />
        <EditorActionBar />

        {/* Canvas area */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <EditorToolbar />
          <EditorCanvas />
        </div>

        {/* Desktop: right panel always open */}
        <div className="shrink-0 overflow-hidden hidden md:block">
          <EditorPanel />
        </div>

        {/* Mobile: arrow toggle to open panel */}
        {isMobile && !mobilePanelOpen && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setMobilePanelOpen(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-8 h-16 bg-primary rounded-l-xl flex items-center justify-center shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        )}

        {/* Mobile: slide-in panel from right */}
        <AnimatePresence>
          {isMobile && mobilePanelOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobilePanelOpen(false)}
                className="absolute inset-0 z-40 bg-black/40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 z-50 w-[85%] max-w-sm"
              >
                <EditorPanel isMobile onClose={() => setMobilePanelOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Editor;
