import { useState } from "react";
import { Bell, Play, ChevronDown, LogOut, User, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUnseenCount, ADMIN_EMAIL } from "@/lib/announcements";
import NotificationsPanel from "./NotificationsPanel";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const unseenCount = getUnseenCount();
  const isAdmin = localStorage.getItem("crieoferta_user_email") === ADMIN_EMAIL;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-header/30 backdrop-blur-md"
      style={{ background: 'linear-gradient(135deg, var(--header-start), var(--header-end))' }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg hero-gradient" />
          <span className="text-lg font-bold text-primary-foreground">
            Crie<span className="text-accent">Oferta</span>
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Play className="h-4 w-4" />
            Assistir Tutorial
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell className="h-5 w-5" />
              {unseenCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center px-1">
                  {unseenCount > 9 ? "9+" : unseenCount}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {notifOpen && (
                <NotificationsPanel open={notifOpen} onOpenChange={setNotifOpen} />
              )}
            </AnimatePresence>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-primary-foreground/10">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs font-semibold">
                    US
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-primary-foreground/80" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" /> Configurações
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem className="gap-2" onClick={() => navigate("/admin")}>
                  <ShieldCheck className="h-4 w-4" /> Painel Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive" onClick={() => navigate("/")}>
                <LogOut className="h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
