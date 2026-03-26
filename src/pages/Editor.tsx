import { useState } from "react";
import { useParams } from "react-router-dom";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorToolbar, { type ToolId } from "@/components/editor/EditorToolbar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import EditorProperties from "@/components/editor/EditorProperties";

const Editor = () => {
  const { themeId } = useParams();
  const [activeTool, setActiveTool] = useState<ToolId>("select");

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        <EditorToolbar activeTool={activeTool} onToolChange={setActiveTool} />
        <EditorCanvas activeTool={activeTool} />
        <EditorProperties activeTool={activeTool} />
      </div>
    </div>
  );
};

export default Editor;
