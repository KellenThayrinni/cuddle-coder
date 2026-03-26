import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar, { type PanelId } from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorPanel from "@/components/editor/EditorPanel";

const Editor = () => {
  const { themeId } = useParams();
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);

  const handlePanelToggle = (panel: PanelId) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar - desktop only (mobile uses bottom bar) */}
        <EditorSidebar activePanel={activePanel} onPanelChange={handlePanelToggle} />

        {/* Canvas */}
        <EditorCanvas />

        {/* Right panel - desktop slides in */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="shrink-0 overflow-hidden hidden md:block"
            >
              <EditorPanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile overlay panel - slides up from bottom */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-x-0 bottom-0 top-0 z-40 md:hidden"
            >
              <EditorPanel activePanel={activePanel} onClose={() => setActivePanel(null)} isMobile />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Editor;
