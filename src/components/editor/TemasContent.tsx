import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const themes = [
  { id: "sem-fundo", name: "Sem Fundo", color: "bg-muted/30" },
  { id: "super-oferta", name: "Super oferta", color: "bg-gradient-to-br from-red-500 to-yellow-500" },
  { id: "sexta-pao", name: "Sexta do pão", color: "bg-gradient-to-br from-amber-600 to-yellow-400" },
  { id: "mais-barato", name: "Sempre mais barato", color: "bg-gradient-to-br from-yellow-500 to-orange-500" },
  { id: "carrinho-cheio", name: "Saia de carrinho cheio", color: "bg-gradient-to-br from-red-600 to-red-400" },
  { id: "no-precinho", name: "Quinta no precinho", color: "bg-gradient-to-br from-green-600 to-yellow-400" },
  { id: "sem-juizo", name: "Quarta sem juízo", color: "bg-gradient-to-br from-purple-600 to-pink-400" },
  { id: "tabloide", name: "Oferta tabloide", color: "bg-gradient-to-br from-orange-500 to-red-500" },
  { id: "diaria", name: "Oferta diária", color: "bg-gradient-to-br from-red-500 to-orange-400" },
  { id: "boa-aqui", name: "Oferta boa é aqui", color: "bg-gradient-to-br from-yellow-400 to-green-500" },
  { id: "descontos", name: "Descontos incríveis", color: "bg-gradient-to-br from-blue-500 to-purple-500" },
  { id: "economia", name: "Economia total", color: "bg-gradient-to-br from-green-500 to-teal-500" },
];

const ThemeCard = ({
  theme,
  isActive,
  onClick,
}: {
  theme: (typeof themes)[0];
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`group flex flex-col rounded-xl overflow-hidden border-2 transition-all duration-200 ${
      isActive
        ? "border-primary shadow-md ring-2 ring-primary/20 scale-[1.02]"
        : "border-border hover:border-primary/40 hover:shadow-sm"
    }`}
  >
    <div
      className={`${theme.color} w-full aspect-[4/3] flex items-center justify-center relative`}
    >
      {theme.id === "sem-fundo" ? (
        <div className="w-12 h-12 rounded-lg border-2 border-dashed border-muted-foreground/30" />
      ) : (
        <span className="text-[10px] font-black text-white/90 uppercase tracking-wider text-center px-2 leading-tight drop-shadow-md">
          {theme.name}
        </span>
      )}
      {isActive && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow">
          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
    <div className="px-2 py-2 bg-card">
      <span
        className={`text-xs font-semibold leading-tight line-clamp-1 ${
          isActive ? "text-primary" : "text-foreground"
        }`}
      >
        {theme.name}
      </span>
    </div>
  </button>
);

const TemasContent = ({ isMobile }: { isMobile?: boolean }) => {
  const [activeTheme, setActiveTheme] = useState("super-oferta");
  const [search, setSearch] = useState("");

  const filtered = themes.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Extra layer option */}
      <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-muted/30">
        <Checkbox id="extra-layer" />
        <label
          htmlFor="extra-layer"
          className="text-xs text-foreground font-medium cursor-pointer leading-snug"
        >
          Marque para adicionar uma camada extra abaixo da grade de produtos.
        </label>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Pesquise um tema aqui..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm border-border"
        />
      </div>

      {/* Themes grid */}
      <div className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"} gap-2`}>
        {filtered.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isActive={activeTheme === theme.id}
            onClick={() => setActiveTheme(theme.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-6">
          Nenhum tema encontrado.
        </p>
      )}
    </div>
  );
};

export default TemasContent;
