import { useState } from "react";
import type { ToolId } from "./EditorToolbar";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Pencil, Palette, Tag, Image,
  Trash2, Heart
} from "lucide-react";

interface EditorPropertiesProps {
  activeTool: ToolId;
}

/* ---- Produtos tab (matching reference) ---- */

const ProductCard = () => (
  <div className="border border-border rounded-xl p-4 space-y-0">
    {/* Toggle row */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Encarte</span>
        <Switch defaultChecked className="scale-75" />
        <span className="text-xs font-medium text-foreground">Cartaz</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Modo:</span>
        <Select defaultValue="automatico">
          <SelectTrigger className="h-7 text-xs w-24 border-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automatico">Automático</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Product content */}
    <div className="border border-primary/20 rounded-xl p-4 bg-primary/[0.02]">
      <div className="flex gap-4">
        {/* Product image area */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div className="w-28 h-28 rounded-lg bg-muted/50 border border-border flex items-center justify-center overflow-hidden">
            <div className="w-20 h-20 rounded-md bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <Image className="w-8 h-8 text-muted-foreground/50" />
            </div>
          </div>
          <button className="flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 transition-colors">
            <Image className="w-3 h-3" />
            Ver mais imagens
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1.5 flex-1">
          {[
            { icon: Pencil, label: "Editar informações", color: "text-foreground" },
            { icon: Palette, label: "Cores e estilos", color: "text-foreground" },
            { icon: Tag, label: "Alterar imagem", color: "text-foreground" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`flex items-center gap-2.5 text-sm ${color} hover:text-primary py-1 transition-colors`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}

          {/* Selo +18 with toggle */}
          <div className="flex items-center gap-2.5 py-1">
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-foreground">Selo +18</span>
            <Switch className="scale-75 ml-auto" />
          </div>

          <button className="flex items-center gap-2.5 text-sm text-destructive hover:text-destructive/80 py-1 transition-colors mt-1">
            <Trash2 className="w-4 h-4" />
            <span className="font-medium">Remover produto</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ProdutosTab = () => (
  <div className="p-4 space-y-4">
    <ProductCard />
  </div>
);

/* ---- Other tabs ---- */

const TemasTab = () => (
  <div className="p-4">
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all"
        />
      ))}
    </div>
  </div>
);

const RodapeTab = () => (
  <div className="p-4">
    <p className="text-sm text-muted-foreground">Configure o rodapé da sua oferta aqui.</p>
  </div>
);

const ImagensTab = () => (
  <div className="p-4">
    <p className="text-sm text-muted-foreground">Gerencie as imagens do seu template.</p>
  </div>
);

const LogoFonteTab = () => (
  <div className="p-4">
    <p className="text-sm text-muted-foreground">Configure logo e fontes.</p>
  </div>
);

const EditorProperties = ({ activeTool }: EditorPropertiesProps) => {
  return (
    <div className="w-80 lg:w-96 border-l border-border bg-card shrink-0 flex flex-col overflow-hidden">
      <Tabs defaultValue="produtos" className="flex flex-col flex-1 overflow-hidden">
        <div className="w-full rounded-none border-b border-border bg-transparent shrink-0 overflow-x-auto">
          <TabsList className="w-full min-w-max rounded-none bg-transparent h-auto p-0">
            {["temas", "produtos", "rodapé", "imagens", "logo/fonte"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none text-[10px] sm:text-xs py-2.5 px-3 uppercase tracking-wide font-semibold whitespace-nowrap"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="temas" className="mt-0"><TemasTab /></TabsContent>
          <TabsContent value="produtos" className="mt-0"><ProdutosTab /></TabsContent>
          <TabsContent value="rodapé" className="mt-0"><RodapeTab /></TabsContent>
          <TabsContent value="imagens" className="mt-0"><ImagensTab /></TabsContent>
          <TabsContent value="logo/fonte" className="mt-0"><LogoFonteTab /></TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Bottom action buttons */}
      <div className="border-t border-border p-3 flex gap-2 shrink-0">
        <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
          + PRODUTO
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
          + LISTA
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs border-primary text-primary hover:bg-primary/5 rounded-full">
          + OPÇÕES
        </Button>
      </div>
    </div>
  );
};

export default EditorProperties;
