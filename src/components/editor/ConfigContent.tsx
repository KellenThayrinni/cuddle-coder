import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image,
  Type,
  Layers,
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ---- Collapsible Section ---- */
const Section = ({
  icon: Icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-bold text-foreground flex-1 text-left">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---- Color circle ---- */
const ColorCircle = ({
  color,
  active,
  onClick,
}: {
  color: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-7 h-7 rounded-full border-2 transition-all ${
      active
        ? "border-primary ring-2 ring-primary/30 scale-110"
        : "border-border hover:border-primary/50"
    }`}
    style={{ backgroundColor: color }}
  />
);

/* ---- Main Component ---- */
const ConfigContent = ({ isMobile }: { isMobile?: boolean }) => {
  const [elementColor, setElementColor] = useState("#d4d4d8");

  return (
    <div className="space-y-3">
      {/* Logomarca */}
      <Section icon={Image} title="Logomarca">
        <div className="flex gap-4">
          {/* Logo preview */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground/60" />
              <span className="text-[9px] text-muted-foreground text-center leading-tight">
                Sua logomarca
              </span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
              <Upload className="w-3 h-3 text-primary-foreground" />
            </button>
          </div>

          {/* Logo settings */}
          <div className="flex-1 space-y-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Forma
              </label>
              <Select defaultValue="sem-forma">
                <SelectTrigger className="h-9 text-sm border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sem-forma">Sem Forma</SelectItem>
                  <SelectItem value="circulo">Círculo</SelectItem>
                  <SelectItem value="quadrado">Quadrado</SelectItem>
                  <SelectItem value="arredondado">Arredondado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Tamanho
              </label>
              <Select defaultValue="100">
                <SelectTrigger className="h-9 text-sm border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                  <SelectItem value="125">125%</SelectItem>
                  <SelectItem value="150">150%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button className="w-full rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Check className="w-4 h-4" />
          Aplicar
        </Button>
      </Section>

      {/* Fontes */}
      <Section icon={Type} title="Fontes">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Fonte do Texto
          </label>
          <Select defaultValue="padrao">
            <SelectTrigger className="h-9 text-sm border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="padrao">Fonte Padrão</SelectItem>
              <SelectItem value="arial">Arial</SelectItem>
              <SelectItem value="roboto">Roboto</SelectItem>
              <SelectItem value="montserrat">Montserrat</SelectItem>
              <SelectItem value="open-sans">Open Sans</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Fonte do Preço
          </label>
          <Select defaultValue="gotham">
            <SelectTrigger className="h-9 text-sm border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gotham">Gotham Ultra</SelectItem>
              <SelectItem value="impact">Impact</SelectItem>
              <SelectItem value="bebas">Bebas Neue</SelectItem>
              <SelectItem value="oswald">Oswald</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      {/* Alterações em Massa */}
      <Section icon={Layers} title="Alterações em Massa">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Unidade de Medida
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Ex.: KG"
              className="h-9 text-sm border-border flex-1"
            />
            <Button className="h-9 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold">
              Aplicar
            </Button>
          </div>
        </div>
      </Section>

      {/* Elementos no Cartaz */}
      <Section icon={Info} title="Elementos no Cartaz">
        <div className="flex items-center gap-2">
          <Checkbox id="ilustrativas" />
          <label
            htmlFor="ilustrativas"
            className="text-xs text-foreground font-medium cursor-pointer leading-snug"
          >
            Adicionar "Imagens meramente ilustrativas"
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Cor
          </label>
          <div className="flex gap-2">
            <ColorCircle
              color="#d4d4d8"
              active={elementColor === "#d4d4d8"}
              onClick={() => setElementColor("#d4d4d8")}
            />
            <ColorCircle
              color="#18181b"
              active={elementColor === "#18181b"}
              onClick={() => setElementColor("#18181b")}
            />
            <ColorCircle
              color="#ffffff"
              active={elementColor === "#ffffff"}
              onClick={() => setElementColor("#ffffff")}
            />
            <ColorCircle
              color="#7c3aed"
              active={elementColor === "#7c3aed"}
              onClick={() => setElementColor("#7c3aed")}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ConfigContent;
