import { useState } from "react";
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
import { Trash2, FolderOpen, Save, Calendar, Search } from "lucide-react";
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
    // TODO: load project logic
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl border-border">
        {/* Header */}
        <div
          className="px-5 py-4 text-white"
          style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
        >
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold flex items-center gap-2">
              {mode === "load" ? (
                <><FolderOpen className="w-5 h-5" /> Carregar Projeto</>
              ) : (
                <><Save className="w-5 h-5" /> Salvar Projeto</>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-xs mt-1">
              {mode === "load"
                ? "Selecione um projeto salvo para carregar no editor."
                : "Salve o projeto atual ou carregue um existente."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-5 space-y-4">
          {/* Save input */}
          {mode === "save" && (
            <div className="flex gap-2">
              <Input
                placeholder="Nome do projeto que deseja salvar"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="flex-1 rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <Button
                onClick={handleSave}
                className="rounded-xl gap-1.5 shrink-0"
                style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
              >
                <Save className="w-4 h-4" />
                Salvar
              </Button>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar projeto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl"
            />
          </div>

          {/* Project list */}
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Projetos Salvos ({filtered.length})
          </div>

          <ScrollArea className="h-[340px] -mx-1 px-1">
            <div className="space-y-1.5">
              <AnimatePresence>
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.15 }}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/[0.03] cursor-pointer transition-all"
                    onClick={() => mode === "load" && handleLoad(project)}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
                    >
                      <FolderOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.date}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhum projeto encontrado.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectManagerModal;
