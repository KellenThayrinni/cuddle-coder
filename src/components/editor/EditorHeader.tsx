import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Undo2, Redo2, Save, Download, Share2 } from "lucide-react";

const EditorHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-11 flex items-center justify-between px-3 md:px-4 shrink-0 text-white"
      style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Crie Oferta
        </button>
        <div className="w-px h-5 bg-white/20 hidden md:block" />
        <div className="hidden md:flex items-center gap-0.5">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-white hover:bg-white/15">
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-white hover:bg-white/15">
            <Redo2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/15 text-xs gap-1.5 hidden sm:inline-flex">
          <Save className="w-3.5 h-3.5" /> <span className="hidden md:inline">Salvar</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/15 text-xs gap-1.5 hidden sm:inline-flex">
          <Download className="w-3.5 h-3.5" /> <span className="hidden md:inline">Exportar</span>
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/15 text-xs gap-1.5 hidden md:inline-flex">
          <Share2 className="w-3.5 h-3.5" /> Compartilhar
        </Button>
        <div className="w-px h-5 bg-white/20 mx-0.5 hidden sm:block" />
        <Button variant="ghost" size="sm" className="h-7 text-white hover:bg-white/15 text-xs gap-1.5" onClick={() => navigate("/dashboard")}>
          <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
