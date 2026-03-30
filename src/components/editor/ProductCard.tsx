import { useState, useRef, useEffect } from "react";
import {
  Pencil, Check, Image, Trash2, Heart,
  ImagePlus, MoreHorizontal, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PriceType = "simples" | "de-por" | "cartao-pix" | "atacado-varejo";

const priceTypeOptions: { value: PriceType; label: string }[] = [
  { value: "simples", label: "Simples" },
  { value: "de-por", label: "De / Por" },
  { value: "cartao-pix", label: "Cartão / Pix-Dinheiro" },
  { value: "atacado-varejo", label: "Atacado / Varejo" },
];

const priceFieldsByType: Record<PriceType, { key: string; label: string; highlight?: boolean }[]> = {
  "simples": [{ key: "price", label: "Valor" }],
  "de-por": [
    { key: "from", label: "De" },
    { key: "to", label: "Por", highlight: true },
  ],
  "cartao-pix": [
    { key: "card", label: "Cartão" },
    { key: "pix", label: "Pix / Dinheiro", highlight: true },
  ],
  "atacado-varejo": [
    { key: "wholesale", label: "Atacado", highlight: true },
    { key: "retail", label: "Varejo" },
  ],
};

/* ---- Tiny Color Dot ---- */
const ColorDot = ({
  color,
  onChange,
  size = "md",
}: {
  color: string;
  onChange: (c: string) => void;
  size?: "sm" | "md";
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dim = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={`${dim} rounded-full border-2 border-border hover:border-primary/60 transition-colors shrink-0 relative overflow-hidden shadow-sm`}
      style={{ backgroundColor: color }}
      title="Alterar cor"
    >
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </button>
  );
};

/* ---- Editable Name ---- */
const EditableName = ({
  name,
  onNameChange,
  nameColor,
  onNameColorChange,
  isMobile,
}: {
  name: string;
  onNameChange: (n: string) => void;
  nameColor: string;
  onNameColorChange: (c: string) => void;
  isMobile?: boolean;
}) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const confirm = () => {
    onNameChange(draft);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2 min-w-0">
      <ColorDot color={nameColor} onChange={onNameColorChange} size="sm" />
      {editing ? (
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") confirm(); if (e.key === "Escape") setEditing(false); }}
            className={`${isMobile ? "h-7 text-xs" : "h-8 text-sm"} flex-1 min-w-0 border-primary/40 bg-background`}
          />
          <button
            onClick={confirm}
            className="w-7 h-7 rounded-md bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors shrink-0"
          >
            <Check className="w-3.5 h-3.5 text-primary" />
          </button>
          <button
            onClick={() => { setDraft(name); setEditing(false); }}
            className="w-7 h-7 rounded-md bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 min-w-0 flex-1 group">
          <span
            className={`${isMobile ? "text-sm" : "text-[15px]"} font-bold text-foreground truncate`}
            style={{ color: nameColor }}
          >
            {name}
          </span>
          <button
            onClick={() => setEditing(true)}
            className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center transition-colors opacity-60 group-hover:opacity-100 shrink-0"
            title="Editar nome"
          >
            <Pencil className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

/* ---- Dynamic Price Fields ---- */
const PriceFields = ({
  priceType,
  prices,
  onPriceChange,
  priceColor,
  onPriceColorChange,
  isMobile,
}: {
  priceType: PriceType;
  prices: Record<string, string>;
  onPriceChange: (key: string, value: string) => void;
  priceColor: string;
  onPriceColorChange: (c: string) => void;
  isMobile?: boolean;
}) => {
  const fields = priceFieldsByType[priceType];
  const isMulti = fields.length > 1;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ColorDot color={priceColor} onChange={onPriceColorChange} size="sm" />
        <span className={`${isMobile ? "text-[10px]" : "text-[11px]"} font-semibold text-muted-foreground uppercase tracking-wide`}>
          Preço
        </span>
      </div>
      <div className={`grid ${isMulti ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            {isMulti && (
              <span className={`${isMobile ? "text-[10px]" : "text-[11px]"} font-semibold ${
                field.highlight ? "text-primary" : "text-muted-foreground"
              }`}>
                {field.label}
              </span>
            )}
            <div className="relative">
              <span className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${isMobile ? "text-xs" : "text-sm"} font-bold ${
                field.highlight ? "text-primary" : "text-muted-foreground"
              }`}>
                R$
              </span>
              <Input
                value={prices[field.key] || ""}
                onChange={(e) => onPriceChange(field.key, e.target.value)}
                placeholder="0,00"
                className={`${isMobile ? "h-8 text-sm" : "h-9 text-sm"} pl-8 font-bold ${
                  field.highlight
                    ? "border-primary/40 bg-primary/[0.03] text-primary"
                    : "border-border bg-background text-foreground"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---- More Options Dropdown ---- */
const MoreOptionsMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground">
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
        <ImagePlus className="w-3.5 h-3.5" /> Alterar imagem
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
        <Image className="w-3.5 h-3.5" /> Ver imagens
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 text-xs cursor-pointer" onSelect={(e) => e.preventDefault()}>
        <Heart className="w-3.5 h-3.5 text-destructive" />
        <span>Selo +18</span>
        <Switch className="scale-[0.6] ml-auto" />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-2 text-xs cursor-pointer text-destructive focus:text-destructive">
        <Trash2 className="w-3.5 h-3.5" /> Remover produto
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ============ MAIN PRODUCT CARD ============ */
export interface ProductCardProps {
  isMobile?: boolean;
  index?: number;
  onViewResult?: () => void;
}

const ProductCard = ({ isMobile, index = 0 }: ProductCardProps) => {
  const [productName, setProductName] = useState(`Produto ${index + 1}`);
  const [nameColor, setNameColor] = useState("#1a1a2e");
  const [priceColor, setPriceColor] = useState("#dc2626");
  const [priceType, setPriceType] = useState<PriceType>("simples");
  const [prices, setPrices] = useState<Record<string, string>>({});

  const handlePriceChange = (key: string, value: string) => {
    setPrices((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card transition-shadow hover:shadow-md">
      {/* Card Inner */}
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-0`}>
        {/* Image Section */}
        <div className={`${isMobile ? "w-full h-28" : "w-36 shrink-0"} bg-muted/30 border-b ${isMobile ? "" : "border-b-0 border-r"} border-border relative group`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${isMobile ? "w-16 h-16" : "w-20 h-20"} rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center`}>
              <Image className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-muted-foreground/40`} />
            </div>
          </div>
          {/* Image overlay button */}
          <button className="absolute inset-0 bg-foreground/0 hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
              <ImagePlus className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold text-primary">Trocar</span>
            </div>
          </button>
          {/* Position badge */}
          <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-md flex items-center justify-center shadow-sm">
            {index + 1}
          </div>
        </div>

        {/* Content Section */}
        <div className={`flex-1 ${isMobile ? "p-3" : "p-4"} space-y-3 min-w-0`}>
          {/* Editable Name */}
          <EditableName
            name={productName}
            onNameChange={setProductName}
            nameColor={nameColor}
            onNameColorChange={setNameColor}
            isMobile={isMobile}
          />

          {/* Price Type Selector */}
          <div className="flex items-center gap-2">
            <span className={`${isMobile ? "text-[10px]" : "text-[11px]"} font-semibold text-muted-foreground uppercase tracking-wide shrink-0`}>
              Tipo
            </span>
            <Select value={priceType} onValueChange={(v) => setPriceType(v as PriceType)}>
              <SelectTrigger className={`${isMobile ? "h-7 text-xs" : "h-8 text-xs"} flex-1 border-border rounded-lg`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceTypeOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Price Inputs */}
          <PriceFields
            priceType={priceType}
            prices={prices}
            onPriceChange={handlePriceChange}
            priceColor={priceColor}
            onPriceColorChange={setPriceColor}
            isMobile={isMobile}
          />

          {/* Secondary actions */}
          <SecondaryActions isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
