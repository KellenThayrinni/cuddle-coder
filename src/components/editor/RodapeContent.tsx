import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Calendar,
  Share2,
  Instagram,
  Phone,
  Facebook,
  Globe,
  MapPin,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ---- Section wrapper ---- */
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

/* ---- Color circle picker ---- */
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
    className={`w-8 h-8 rounded-full border-2 transition-all ${
      active ? "border-primary ring-2 ring-primary/30 scale-110" : "border-border hover:border-primary/50"
    }`}
    style={{ backgroundColor: color }}
  />
);

/* ---- Social row ---- */
const SocialRow = ({
  icon: Icon,
  iconColor,
  placeholder,
  defaultValue,
  defaultChecked,
}: {
  icon: React.ElementType;
  iconColor: string;
  placeholder: string;
  defaultValue?: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex items-center gap-2.5">
    <Checkbox defaultChecked={defaultChecked} className="shrink-0" />
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
      <Icon className="w-4 h-4 text-primary-foreground" />
    </div>
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="h-9 text-sm border-border focus:border-primary"
    />
  </div>
);

/* ---- Payment icons (colored placeholder badges) ---- */
const paymentMethods = [
  { name: "Dinheiro", color: "bg-green-600" },
  { name: "Débito", color: "bg-red-500" },
  { name: "Crédito", color: "bg-blue-500" },
  { name: "PIX", color: "bg-teal-500" },
  { name: "Boleto", color: "bg-gray-500" },
  { name: "Elo", color: "bg-yellow-500" },
  { name: "Elo Déb.", color: "bg-yellow-600" },
  { name: "Visa", color: "bg-blue-700" },
  { name: "Master", color: "bg-red-600" },
  { name: "Hiper", color: "bg-orange-500" },
  { name: "Amex", color: "bg-blue-800" },
  { name: "Cielo", color: "bg-blue-400" },
  { name: "Hiper", color: "bg-orange-600" },
  { name: "Mais!", color: "bg-yellow-400" },
  { name: "Sodexo", color: "bg-red-700" },
  { name: "Soro", color: "bg-red-400" },
  { name: "VR", color: "bg-green-500" },
  { name: "VR Ref.", color: "bg-green-600" },
  { name: "Sodexo R.", color: "bg-red-500" },
  { name: "Ticket", color: "bg-orange-400" },
];

const PaymentBadge = ({ method }: { method: (typeof paymentMethods)[0] }) => {
  const [selected, setSelected] = useState(true);
  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
        selected
          ? "ring-2 ring-primary shadow-sm scale-100"
          : "opacity-40 hover:opacity-70 scale-95"
      }`}
    >
      <div
        className={`${method.color} w-full h-full flex items-center justify-center px-2 py-2 min-h-[40px]`}
      >
        <span className="text-[10px] font-bold text-white leading-tight text-center">
          {method.name}
        </span>
      </div>
      {selected && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-primary-foreground" />
        </div>
      )}
    </button>
  );
};

/* ---- Main component ---- */
const RodapeContent = ({ isMobile }: { isMobile?: boolean }) => {
  const [shapeColor, setShapeColor] = useState("#e11d48");
  const [fontColor, setFontColor] = useState("#d4d4d8");

  return (
    <div className="space-y-3">
      {/* Validade da Oferta */}
      <Section icon={Calendar} title="Validade da Oferta">
        <div className="flex items-center gap-2">
          <Checkbox id="show-validity" />
          <label htmlFor="show-validity" className="text-xs text-foreground font-medium cursor-pointer">
            Exibir validade no rodapé
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Data da Validade
          </label>
          <Input
            type="date"
            defaultValue="2026-03-28"
            className="h-9 text-sm border-border"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Texto da Validade
          </label>
          <Input
            defaultValue="Oferta válida até 28/03/2026 ou enquanto durarem os estoques."
            className="h-9 text-sm border-border"
          />
        </div>
      </Section>

      {/* Redes Sociais e Endereço */}
      <Section icon={Share2} title="Redes Sociais e Endereço">
        <div className="flex items-center gap-2">
          <Checkbox id="rounded-borders" defaultChecked />
          <label htmlFor="rounded-borders" className="text-xs text-foreground font-medium cursor-pointer">
            Bordas arredondadas
          </label>
        </div>

        <div className={`flex ${isMobile ? "flex-col gap-3" : "gap-6"}`}>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Cor da Forma
            </label>
            <div className="flex gap-2">
              <ColorCircle color="#e11d48" active={shapeColor === "#e11d48"} onClick={() => setShapeColor("#e11d48")} />
              <ColorCircle color="#7c3aed" active={shapeColor === "#7c3aed"} onClick={() => setShapeColor("#7c3aed")} />
              <ColorCircle color="#2563eb" active={shapeColor === "#2563eb"} onClick={() => setShapeColor("#2563eb")} />
              <ColorCircle color="#16a34a" active={shapeColor === "#16a34a"} onClick={() => setShapeColor("#16a34a")} />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Cor da Fonte
            </label>
            <div className="flex gap-2">
              <ColorCircle color="#d4d4d8" active={fontColor === "#d4d4d8"} onClick={() => setFontColor("#d4d4d8")} />
              <ColorCircle color="#18181b" active={fontColor === "#18181b"} onClick={() => setFontColor("#18181b")} />
              <ColorCircle color="#ffffff" active={fontColor === "#ffffff"} onClick={() => setFontColor("#ffffff")} />
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <SocialRow icon={Instagram} iconColor="bg-gradient-to-br from-purple-500 to-pink-500" placeholder="@seu_instagram" defaultChecked={false} />
          <SocialRow icon={Phone} iconColor="bg-green-500" placeholder="(00) 00000-0000" defaultChecked={false} />
          <SocialRow icon={Facebook} iconColor="bg-blue-600" placeholder="Sua página" defaultChecked={false} />
          <SocialRow icon={Globe} iconColor="bg-muted-foreground" placeholder="www.seusite.com" defaultChecked={false} />
          <SocialRow icon={MapPin} iconColor="bg-primary" placeholder="Seu endereço" defaultChecked />
        </div>

        <Button className="w-full rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Check className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </Section>

      {/* Meios de Pagamento */}
      <Section icon={CreditCard} title="Meios de Pagamento">
        <div className="grid grid-cols-5 gap-1.5">
          {paymentMethods.map((method, i) => (
            <PaymentBadge key={`${method.name}-${i}`} method={method} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default RodapeContent;
