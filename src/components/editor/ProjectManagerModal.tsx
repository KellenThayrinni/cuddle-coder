import { useState, useCallback } from "react";
import ProjectLoadingScreen from "./ProjectLoadingScreen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, FolderOpen, Save, Search, Clock, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavedProject {
  id: string;
  name: string;
  date: string;
}

const mockProjects: SavedProject[] = [
  { id: "1", name: "9 itens teste", date: "20/03/2026 09:07:24" },
  { id: "2", name: "horti novo", date: "17/03/2026 13:43:40" },
  { id: "3", name: "Horta vídeo", date: "05/03/2026 20:12:13" },
  { id: "4", name: "testeoitech2", date: "26/02/2026 10:43:41" },
  { id: "5", name: "testeoietech", date: "26/02/2026 10:41:20" },
  { id: "6", name: "Ricardo teste", date: "14/08/2025 14:54:31" },
  { id: "7", name: "testeteste", date: "02/07/2025 12:20:40" },
  { id: "8", name: "Mercado diversos", date: "10/04/2025 19:57:31" },
  { id: "9", name: "Cerveja 300ml", date: "10/04/2025 19:54:43" },
  { id: "10", name: "teste1004", date: "10/04/2025 09:25:49" },
  { id: "11", name: "petshop", date: "18/11/2024 13:50:06" },
  { id: "12", name: "loja moto peça", date: "13/11/2024 13:46:42" },
];

interface ProjectManagerModalProps {
  open: boolean;
  onClose: () => void;
  mode: "save" | "load";
}

const ProjectManagerModal = ({ open, onClose, mode }: ProjectManagerModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<SavedProject[]>(mockProjects);
  const [loadingProject, setLoadingProject] = useState<SavedProject | null>(null);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!projectName.trim()) return;
    const newProject: SavedProject = {
      id: Date.now().toString(),
      name: projectName.trim(),
      date: new Date().toLocaleString("pt-BR"),
    };
    setProjects((prev) => [newProject, ...prev]);
    setProjectName("");
  };

  const handleLoad = (project: SavedProject) => {
    setLoadingProject(project);
  };

  const handleLoadComplete = useCallback(() => {
    setLoadingProject(null);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v && !loadingProject) onClose(); }}>
      <DialogContent className={`sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl border-none shadow-2xl bg-card ${loadingProject ? "[&>button]:hidden" : ""}`}>
        {/* Minimal header */}
        <div className="px-6 pt-6 pb-4">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2.5">
              {mode === "load" ? (
                <>
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 text-primary" />
                  </div>
                  Meus Projetos
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Save className="w-4 h-4 text-primary" />
                  </div>
                  Salvar Projeto
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pl-[42px]">
              {mode === "load"
                ? `${filtered.length} projetos salvos`
                : "Dê um nome e salve seu projeto"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Save input */}
          {mode === "save" && (
            <div className="flex gap-2">
              <Input
                placeholder="Nome do projeto..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="flex-1 h-10 rounded-xl border-border bg-muted/30 text-sm focus-visible:ring-primary/30"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <Button
                onClick={handleSave}
                disabled={!projectName.trim()}
                className="rounded-xl h-10 px-5 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="w-4 h-4" />
                Salvar
              </Button>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-xl border-border bg-muted/30 text-sm focus-visible:ring-primary/30"
            />
          </div>

          {/* Project list */}
          <ScrollArea className="h-[360px]">
            <div className="space-y-1">
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                    className="group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => mode === "load" && handleLoad(project)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4.5 h-4.5 text-primary/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{project.name}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {project.date}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <FolderOpen className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm font-medium">Nenhum projeto encontrado</p>
                  <p className="text-xs mt-1 opacity-60">Tente outro termo de busca</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManagerModal;