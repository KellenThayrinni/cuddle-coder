import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Phone, ArrowRight, Send, KeyRound, Trash2 } from "lucide-react";

type FormView = "login" | "register" | "forgot";

const LoginForm = () => {
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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl card-shadow p-8 md:p-10 border border-border/50 backdrop-blur-sm">
        {view === "forgot" ? (
          <ForgotView
            email={email}
            setEmail={setEmail}
            onBack={() => setView("login")}
          />
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-border mb-8">
              <button
                onClick={() => setView("login")}
                className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors ${
                  view === "login"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setView("register")}
                className={`flex-1 pb-3 text-sm font-semibold tracking-wide transition-colors ${
                  view === "register"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cadastrar-se
              </button>
            </div>

            {view === "login" ? (
              <LoginView
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onForgot={() => setView("forgot")}
                onClear={clearData}
              />
            ) : (
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
            )}
          </>
        )}
      </div>
    </div>
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
}

const LoginView = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, onForgot, onClear }: LoginViewProps) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
    <FormField label="E-MAIL" icon={<Mail className="w-4 h-4 text-muted-foreground" />}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <FormField label="SENHA" icon={<Lock className="w-4 h-4 text-muted-foreground" />}>
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

    <button type="submit" className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm">
      Entrar <ArrowRight className="w-4 h-4" />
    </button>

    <div className="flex items-center justify-between text-xs">
      <button onClick={onForgot} className="text-primary hover:underline flex items-center gap-1.5 font-medium">
        <KeyRound className="w-3.5 h-3.5" /> Esqueceu a senha?
      </button>
      <button onClick={onClear} className="text-primary hover:underline flex items-center gap-1.5 font-medium">
        <Trash2 className="w-3.5 h-3.5" /> Limpar dados
      </button>
    </div>

    <div className="flex gap-3 pt-2">
      <button type="button" className="flex-1 border border-border rounded-xl py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
        <span className="text-sm">🖥️</span> App Windows
      </button>
      <button type="button" className="flex-1 border border-border rounded-xl py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
        <span className="text-sm">☁️</span> Crie Oferta TV
      </button>
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
    <FormField label="TELEFONE / WHATSAPP" icon={<Phone className="w-4 h-4 text-muted-foreground" />}>
      <input
        type="tel"
        placeholder="(00) 00000-0000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form-input-field"
        maxLength={20}
      />
    </FormField>

    <FormField label="E-MAIL" icon={<Mail className="w-4 h-4 text-muted-foreground" />}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <FormField label="SENHA" icon={<Lock className="w-4 h-4 text-muted-foreground" />}>
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

    <button type="submit" className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm">
      Continuar <ArrowRight className="w-4 h-4" />
    </button>

    <button onClick={onBack} className="w-full text-center text-xs text-primary hover:underline font-medium pt-1">
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

    <FormField label="E-MAIL CADASTRADO" icon={<Mail className="w-4 h-4 text-muted-foreground" />}>
      <input
        type="email"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input-field"
        maxLength={255}
      />
    </FormField>

    <button type="submit" className="w-full btn-gradient text-primary-foreground font-semibold py-3.5 rounded-xl button-shadow hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm">
      Enviar link de recuperação <Send className="w-4 h-4" />
    </button>

    <button onClick={onBack} className="w-full text-center text-xs text-primary hover:underline font-medium pt-1">
      ← Voltar ao login
    </button>
  </form>
);

const FormField = ({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <label className="block text-[11px] font-semibold tracking-wider text-muted-foreground mb-2 uppercase">
      {label}
    </label>
    <div className="relative flex items-center bg-muted/50 border border-border rounded-xl px-3 focus-within:border-primary focus-within:input-focus-shadow transition-all">
      <span className="mr-2 shrink-0">{icon}</span>
      {children}
    </div>
  </div>
);

export default LoginForm;
