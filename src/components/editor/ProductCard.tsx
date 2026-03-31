import { useState, useRef, useEffect } from "react";
import {
  Pencil, Check, Image, Trash2, Heart,
  ImagePlus, Settings, X, ChevronDown
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
  const dim = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className={`${dim} rounded-full border-2 border-border hover:border-primary/60 transition-colors shrink-0 relative overflow-hidden`}
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
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
          Cor do preço
        </span>
      </div>
      <div className={`grid ${isMulti ? "grid-cols-2" : "grid-cols-1"} gap-2`}>
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            {isMulti && (
              <span className={`text-[10px] font-semibold ${
                field.highlight ? "text-primary" : "text-muted-foreground"
              }`}>
                {field.label}
              </span>
            )}
            <div className="relative">
              <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold ${
                field.highlight ? "text-primary" : "text-muted-foreground"
              }`}>
                R$
              </span>
              <Input
                value={prices[field.key] || ""}
                onChange={(e) => onPriceChange(field.key, e.target.value)}
                placeholder="0,00"
                className={`h-8 text-sm pl-7 font-bold ${
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
  const [expanded, setExpanded] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(productName);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceDraft, setPriceDraft] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [editingName]);

  useEffect(() => {
    if (editingPrice) {
      priceInputRef.current?.focus();
      priceInputRef.current?.select();
    }
  }, [editingPrice]);

  const confirmPrice = () => {
    const mainKey = mainField[mainField.length - 1].key;
    setPrices((prev) => ({ ...prev, [mainKey]: priceDraft }));
    setEditingPrice(false);
  };

  const confirmName = () => {
    setProductName(nameDraft);
    setEditingName(false);
  };

  const handlePriceChange = (key: string, value: string) => {
    setPrices((prev) => ({ ...prev, [key]: value }));
  };

  // Get display price for collapsed view
  const mainField = priceFieldsByType[priceType];
  const displayPrice = prices[mainField[mainField.length - 1].key] || "0,00";

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card transition-shadow hover:shadow-sm">
      {/* === COLLAPSED ROW: Image + Name/Price + Arrow === */}
      <div className="flex items-center gap-3 p-2">
        {/* Position + Image */}
        <div className="relative w-10 h-10 rounded-md bg-muted/40 flex items-center justify-center shrink-0">
          <Image className="w-4 h-4 text-muted-foreground/40" />
          <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {index + 1}
          </div>
        </div>

        {/* Name + Price stacked */}
        <div className="flex-1 min-w-0 space-y-0.5" onClick={(e) => e.stopPropagation()}>
          {/* Name */}
          {editingName ? (
            <div className="flex items-center gap-1">
              <Input
                ref={nameInputRef}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") confirmName(); if (e.key === "Escape") { setNameDraft(productName); setEditingName(false); } }}
                className="h-7 text-xs flex-1 min-w-0 border-primary/40"
              />
              <button onClick={confirmName} className="w-6 h-6 rounded flex items-center justify-center hover:bg-primary/10 shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </button>
              <button onClick={() => { setNameDraft(productName); setEditingName(false); }} className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted shrink-0">
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setEditingName(true); setNameDraft(productName); }}
              className="text-sm font-semibold truncate text-left w-full hover:text-primary/80 transition-colors"
              style={{ color: nameColor }}
              title="Clique para editar"
            >
              {productName}
            </button>
          )}

          {/* Always-visible price inputs */}
          <div className="flex items-center gap-2">
            {mainField.map((field) => {
              const isFromField = field.key === "from";
              return (
                <div key={field.key} className="relative">
                  {mainField.length > 1 && (
                    <span className={`absolute -top-2.5 left-1 text-[8px] font-bold uppercase ${
                      isFromField ? "text-red-400" : "text-emerald-600"
                    }`}>
                      {field.label}
                    </span>
                  )}
                  <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-bold ${
                    isFromField ? "text-red-400" : "text-emerald-600"
                  }`}>
                    R$
                  </span>
                  <Input
                    value={prices[field.key] || ""}
                    onChange={(e) => handlePriceChange(field.key, e.target.value)}
                    placeholder="0,00"
                    className={`h-7 text-xs font-bold pl-7 pr-2 w-24 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                      isFromField
                        ? "border-red-300 bg-red-50/50 text-red-400 line-through"
                        : "border-emerald-300 bg-emerald-50/50 text-emerald-700 focus:border-emerald-500"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Expand arrow */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center shrink-0 transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* === EXPANDED OPTIONS === */}
      {expanded && (
        <div className="border-t border-border px-3 py-3 space-y-3 bg-muted/10">
          {/* Image change */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-md bg-muted/30 flex items-center justify-center relative group shrink-0">
              <Image className="w-6 h-6 text-muted-foreground/40" />
              <button className="absolute inset-0 bg-foreground/0 hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-md">
                <ImagePlus className="w-4 h-4 text-primary" />
              </button>
            </div>
            <div className="flex-1 space-y-1">
              {/* Name color */}
              <div className="flex items-center gap-2">
                <ColorDot color={nameColor} onChange={setNameColor} size="sm" />
                <span className="text-[10px] text-muted-foreground">Cor do nome</span>
              </div>
            </div>
          </div>

          {/* Price Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide shrink-0">
              Tipo
            </span>
            <Select value={priceType} onValueChange={(v) => setPriceType(v as PriceType)}>
              <SelectTrigger className="h-7 text-xs flex-1 border-border rounded-lg">
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

          {/* Price Fields */}
          <PriceFields
            priceType={priceType}
            prices={prices}
            onPriceChange={handlePriceChange}
            priceColor={priceColor}
            onPriceColorChange={setPriceColor}
            isMobile={isMobile}
          />

          {/* Advanced actions */}
          <div className="flex items-center justify-between pt-1 border-t border-border/50">
            <div className="flex items-center gap-1">
              <button className="h-7 px-2 rounded text-[11px] text-muted-foreground hover:bg-muted flex items-center gap-1.5 transition-colors">
                <Heart className="w-3 h-3" /> Selo +18
                <Switch className="scale-[0.5] ml-1" />
              </button>
            </div>
            <button className="h-7 px-2 rounded text-[11px] text-destructive hover:bg-destructive/10 flex items-center gap-1.5 transition-colors">
              <Trash2 className="w-3 h-3" /> Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
