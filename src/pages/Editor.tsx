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
        {/* Left sidebar - always visible */}
        <EditorSidebar activePanel={activePanel} onPanelChange={handlePanelToggle} />

        {/* Canvas */}
        <EditorCanvas />

        {/* Right panel - slides in/out */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="shrink-0 overflow-hidden"
            >
              <EditorPanel activePanel={activePanel} onClose={() => setActivePanel(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile overlay panel */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 z-50 md:hidden"
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
