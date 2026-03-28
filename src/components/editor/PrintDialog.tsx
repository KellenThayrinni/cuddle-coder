import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Printer, FileDown } from "lucide-react";

const sheetFormats = ["A4", "A3", "A2", "A1", "A0"] as const;

const printSizes = [
  { value: "g", label: "Tamanho G", sub: "1 por folha" },
  { value: "m", label: "Tamanho M", sub: "2 por folha" },
  { value: "p", label: "Tamanho P", sub: "4 por folha" },
  { value: "pp", label: "Tamanho PP", sub: "9 por folha" },
] as const;

const posterSizes = [
  { value: "2x1", label: "Pôster 2×1", sub: "2 folhas" },
  { value: "2x2", label: "Pôster 2×2", sub: "4 folhas" },
  { value: "3x3", label: "Pôster 3×3", sub: "9 folhas" },
  { value: "4x4", label: "Pôster 4×4", sub: "16 folhas" },
] as const;

interface PrintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrintDialog = ({ open, onOpenChange }: PrintDialogProps) => {
  const [addFold, setAddFold] = useState(false);
  const [sheetFormat, setSheetFormat] = useState("A4");
  const [printFormat, setPrintFormat] = useState("g");
  const [wideFormat, setWideFormat] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90dvh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Printer className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-base">Imprimir Cartaz</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Escolha o tamanho e formato de impressão
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 py-4 space-y-5">
          {/* Fold checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <Checkbox checked={addFold} onCheckedChange={(v) => setAddFold(!!v)} />
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
              Acrescentar o <strong>DOBRE AQUI</strong>
            </span>
          </label>

          {/* Sheet format */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Formato da folha
            </p>
            <RadioGroup value={sheetFormat} onValueChange={setSheetFormat} className="flex flex-wrap gap-2">
              {sheetFormats.map((fmt) => (
                <label
                  key={fmt}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm font-medium ${
                    sheetFormat === fmt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem value={fmt} className="sr-only" />
                  {fmt}
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Print format */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Formato da impressão
            </p>
            <div className="grid grid-cols-2 gap-2">
              {printSizes.map((size) => (
                <label
                  key={size.value}
                  className={`flex flex-col px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                    printFormat === size.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:border-primary/40"
                  }`}
                >
                  <RadioGroup value={printFormat} onValueChange={setPrintFormat} className="hidden">
                    <RadioGroupItem value={size.value} />
                  </RadioGroup>
                  <input
                    type="radio"
                    name="printFormat"
                    value={size.value}
                    checked={printFormat === size.value}
                    onChange={() => setPrintFormat(size.value)}
                    className="sr-only"
                  />
                  <span className={`text-sm font-medium ${printFormat === size.value ? "text-primary" : "text-foreground"}`}>
                    {size.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{size.sub}</span>
                </label>
              ))}

              <div className="col-span-2 border-t border-border pt-2 mt-1">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Pôster (múltiplas folhas)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {posterSizes.map((size) => (
                    <label
                      key={size.value}
                      className={`flex flex-col px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                        printFormat === size.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted/30 hover:border-primary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="printFormat"
                        value={size.value}
                        checked={printFormat === size.value}
                        onChange={() => setPrintFormat(size.value)}
                        className="sr-only"
                      />
                      <span className={`text-sm font-medium ${printFormat === size.value ? "text-primary" : "text-foreground"}`}>
                        {size.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{size.sub}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Wide format checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer group p-3 rounded-lg bg-muted/30 border border-border">
            <Checkbox checked={wideFormat} onCheckedChange={(v) => setWideFormat(!!v)} className="mt-0.5" />
            <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
              Marque aqui se vai imprimir com impressora que utiliza uma largura especial de{" "}
              <strong className="text-foreground">610mm</strong> e deseja que cada página se adapte a ela horizontalmente.
            </span>
          </label>
        </div>

        <DialogFooter className="px-5 py-4 border-t border-border gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none gap-2 btn-gradient text-primary-foreground">
            <FileDown className="w-4 h-4" />
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintDialog;
