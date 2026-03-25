import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Phone, ArrowRight, Send, KeyRound, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormView = "login" | "register" | "forgot";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.3, ease: "easeInOut" };

const LoginForm = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<FormView>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const clearData = () => {
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl card-shadow p-8 md:p-10 border border-border/50 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {view === "forgot" ? (
            <motion.div
              key="forgot"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ForgotView
                email={email}
                setEmail={setEmail}
                onBack={() => setView("login")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              {/* Tabs */}
              <div className="flex border-b border-border mb-8">
                <button
                  onClick={() => setView("login")}
                  className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors relative ${
                    view === "login"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Entrar
                  {view === "login" && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setView("register")}
                  className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors relative ${
                    view === "register"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cadastrar-se
                  {view === "register" && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {view === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <LoginView
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      onForgot={() => setView("forgot")}
                      onClear={clearData}
                      onSubmit={() => navigate("/dashboard")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <RegisterView
                      phone={phone}
                      setPhone={setPhone}
                      email={email}
                      setEmail={setEmail}
                      password={password}
                      setPassword={setPassword}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      onBack={() => setView("login")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface LoginViewProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onForgot: () => void;
  onClear: () => void;
  onSubmit: () => void;
}

const LoginView = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, onForgot, onClear }: LoginViewProps) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
    <FormField label="E-MAIL" icon={<Mail className="w-4 h-4 text-muted-foreground" />} delay={0}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <FormField label="SENHA" icon={<Lock className="w-4 h-4 text-muted-foreground" />} delay={0.05}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input-field pr-10"
        maxLength={128}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </FormField>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
    >
      Entrar <ArrowRight className="w-4 h-4" />
    </motion.button>

    <div className="flex items-center justify-between text-xs">
      <button onClick={onForgot} className="text-primary hover:underline flex items-center gap-1.5 font-medium transition-colors">
        <KeyRound className="w-3.5 h-3.5" /> Esqueceu a senha?
      </button>
      <button onClick={onClear} className="text-primary hover:underline flex items-center gap-1.5 font-medium transition-colors">
        <Trash2 className="w-3.5 h-3.5" /> Limpar dados
      </button>
    </div>

    <div className="flex gap-3 pt-2">
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex-1 border border-border rounded-xl py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-sm">🖥️</span> App Windows
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex-1 border border-border rounded-xl py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
      >
        <span className="text-sm">☁️</span> Crie Oferta TV
      </motion.button>
    </div>
  </form>
);

interface RegisterViewProps {
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onBack: () => void;
}

const RegisterView = ({ phone, setPhone, email, setEmail, password, setPassword, showPassword, setShowPassword, onBack }: RegisterViewProps) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
    <FormField label="TELEFONE / WHATSAPP" icon={<Phone className="w-4 h-4 text-muted-foreground" />} delay={0}>
      <input
        type="tel"
        placeholder="(00) 00000-0000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form-input-field"
        maxLength={20}
      />
    </FormField>

    <FormField label="E-MAIL" icon={<Mail className="w-4 h-4 text-muted-foreground" />} delay={0.05}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <FormField label="SENHA" icon={<Lock className="w-4 h-4 text-muted-foreground" />} delay={0.1}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input-field pr-10"
        maxLength={128}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </FormField>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
    >
      Continuar <ArrowRight className="w-4 h-4" />
    </motion.button>

    <button onClick={onBack} className="w-full text-center text-xs text-primary hover:underline font-medium pt-1 transition-colors">
      ← Já tenho uma conta
    </button>
  </form>
);

interface ForgotViewProps {
  email: string;
  setEmail: (v: string) => void;
  onBack: () => void;
}

const ForgotView = ({ email, setEmail, onBack }: ForgotViewProps) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
    <div>
      <h2 className="text-xl font-bold text-primary mb-1">Esqueceu a senha?</h2>
      <p className="text-sm text-muted-foreground">
        Digite o e-mail cadastrado e enviaremos um link para redefinir sua senha.
      </p>
    </div>

    <FormField label="E-MAIL CADASTRADO" icon={<Mail className="w-4 h-4 text-muted-foreground" />} delay={0}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
    >
      Enviar link de recuperação <Send className="w-4 h-4" />
    </motion.button>

    <button onClick={onBack} className="w-full text-center text-xs text-primary hover:underline font-medium pt-1 transition-colors">
      ← Voltar ao login
    </button>
  </form>
);

const FormField = ({ label, icon, children, delay = 0 }: { label: string; icon: React.ReactNode; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
  >
    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground mb-2 uppercase">
      {label}
    </label>
    <div className="relative flex items-center bg-muted/50 border border-border rounded-xl px-3 focus-within:border-primary focus-within:input-focus-shadow transition-all">
      <span className="mr-2 shrink-0">{icon}</span>
      {children}
    </div>
  </motion.div>
);

export default LoginForm;
