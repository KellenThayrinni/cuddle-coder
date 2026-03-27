import { useParams } from "react-router-dom";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorToolbar from "@/components/editor/EditorToolbar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorPanel from "@/components/editor/EditorPanel";

const Editor = () => {
  const { themeId } = useParams();

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar */}
        <EditorSidebar />

        {/* Canvas area */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <EditorToolbar />
          <EditorCanvas />
        </div>

        {/* Right panel - always open on desktop */}
        <div className="shrink-0 overflow-hidden hidden md:block">
          <EditorPanel />
        </div>

        {/* Mobile: panel always visible at bottom */}
        <div className="absolute inset-x-0 bottom-0 z-40 md:hidden max-h-[50dvh] rounded-t-2xl shadow-lg border-t border-border bg-card overflow-hidden">
          <EditorPanel isMobile />
        </div>
      </div>
    </div>
  );
};

export default Editor;
