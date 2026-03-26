import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, ArrowLeft, ShieldAlert, Save, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Announcement,
  ADMIN_EMAIL,
  ICON_OPTIONS,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
} from "@/lib/announcements";

const Admin = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Simple check — in real app this would be server-side
    const userEmail = localStorage.getItem("crieoferta_user_email");
    if (userEmail === ADMIN_EMAIL) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      setTimeout(() => navigate("/"), 3000);
    }
  }, [navigate]);

  if (authorized === null) return null;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-sm"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Acesso Negado</h1>
          <p className="text-sm text-muted-foreground">
            Você não tem permissão para acessar esta página. Redirecionando...
          </p>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-destructive/60 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminPanel />;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [isNew, setIsNew] = useState(false);

  const reload = () => setAnnouncements(getAnnouncements());

  useEffect(() => {
    reload();
  }, []);

  const handleNew = () => {
    setEditing({
      id: "",
      icon: "🎉",
      title: "",
      text: "",
      showPopupOnLogin: false,
      createdAt: "",
    });
    setIsNew(true);
  };

  const handleSave = (data: Omit<Announcement, "id" | "createdAt">) => {
    if (isNew) {
      addAnnouncement(data);
    } else if (editing) {
      updateAnnouncement(editing.id, data);
    }
    setEditing(null);
    setIsNew(false);
    reload();
  };

  const handleDelete = (id: string) => {
    removeAnnouncement(id);
    reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-header/30 backdrop-blur-md"
        style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
      >
        <div className="container flex h-14 items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Bell className="w-5 h-5 text-primary-foreground/80" />
          <h1 className="text-base font-semibold text-primary-foreground">
            Gerenciar Comunicados
          </h1>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* New button */}
        <Button onClick={handleNew} className="w-full gap-2 btn-gradient text-primary-foreground rounded-xl h-11">
          <Plus className="w-4 h-4" /> Novo Comunicado
        </Button>

        {/* Edit form */}
        <AnimatePresence>
          {editing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <AnnouncementForm
                initial={editing}
                onSave={handleSave}
                onCancel={() => { setEditing(null); setIsNew(false); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        {announcements.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            Nenhum comunicado criado ainda.
          </div>
        ) : (
          <div className="space-y-2">
            {announcements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-card border border-border/50 rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-2xl shrink-0 mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground truncate">{a.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{a.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {a.showPopupOnLogin && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        Popup no login
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(a.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => { setEditing(a); setIsNew(false); }}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(a.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface FormProps {
  initial: Announcement;
  onSave: (data: Omit<Announcement, "id" | "createdAt">) => void;
  onCancel: () => void;
}

const AnnouncementForm = ({ initial, onSave, onCancel }: FormProps) => {
  const [icon, setIcon] = useState(initial.icon);
  const [title, setTitle] = useState(initial.title);
  const [text, setText] = useState(initial.text);
  const [showPopup, setShowPopup] = useState(initial.showPopupOnLogin);

  return (
    <div className="bg-card border border-border/50 rounded-xl p-5 space-y-4">
      {/* Icon picker */}
      <div>
        <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground mb-2 uppercase">
          Ícone
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ICON_OPTIONS.map((e) => (
            <button
              key={e}
              onClick={() => setIcon(e)}
              className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                icon === e
                  ? "bg-primary/15 ring-2 ring-primary scale-110"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground mb-2 uppercase">
          Título
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Nova funcionalidade disponível!"
          className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          maxLength={100}
        />
      </div>

      {/* Text */}
      <div>
        <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground mb-2 uppercase">
          Descrição
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Descreva a novidade em detalhes..."
          rows={3}
          className="w-full bg-muted/50 border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          maxLength={500}
        />
      </div>

      {/* Popup toggle */}
      <div className="flex items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
        <div>
          <p className="text-sm font-medium text-foreground">Exibir popup no login</p>
          <p className="text-xs text-muted-foreground">Mostrar automaticamente ao entrar</p>
        </div>
        <Switch checked={showPopup} onCheckedChange={setShowPopup} />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => { if (title.trim()) onSave({ icon, title, text, showPopupOnLogin: showPopup }); }}
          className="flex-1 gap-2 btn-gradient text-primary-foreground rounded-xl"
          disabled={!title.trim()}
        >
          <Save className="w-4 h-4" /> Salvar
        </Button>
        <Button variant="outline" onClick={onCancel} className="rounded-xl gap-2">
          <X className="w-4 h-4" /> Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Admin;
