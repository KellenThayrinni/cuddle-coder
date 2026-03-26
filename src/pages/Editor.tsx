import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, ChevronDown, Image, Type, Palette, Tag, Trash2, Eye,
  FileText, Monitor, Smartphone, Square, RectangleHorizontal,
  LayoutGrid, Share2, ZoomIn, ZoomOut, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const formats = [
  { id: "a4-portrait", label: "A4", icon: FileText },
  { id: "a4-landscape", label: "A4", icon: RectangleHorizontal },
  { id: "storie", label: "Storie", icon: Smartphone },
  { id: "1080", label: "1080x1080", icon: Square },
  { id: "feed", label: "Feed Instagram", icon: LayoutGrid },
  { id: "tv", label: "TV", icon: Monitor },
  { id: "oferta-tv", label: "Oferta TV", icon: Monitor },
  { id: "gondola", label: "Gôndola", icon: RectangleHorizontal },
  { id: "gancho", label: "Gancho", icon: RectangleHorizontal },
];

const Editor = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState("a4-portrait");
  const [maxItems, setMaxItems] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <div
        className="h-12 flex items-center justify-between px-4 shrink-0 text-white"
        style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-sm font-semibold hover:opacity-80 transition-opacity">
            SEU LOGIN
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Máximo:</span>
          <select
            value={maxItems}
            onChange={(e) => setMaxItems(Number(e.target.value))}
            className="bg-white/20 border border-white/30 rounded px-2 py-0.5 text-white text-sm"
          >
            {[6, 12, 24, 48].map(n => <option key={n} value={n} className="text-foreground">{n}</option>)}
          </select>
          <span>Pág.:</span>
          <input
            type="number"
            min={1}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="w-10 bg-white/20 border border-white/30 rounded px-1.5 py-0.5 text-white text-sm text-center"
          />
        </div>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => navigate("/dashboard")}>
          <LogOut className="w-4 h-4 mr-1" /> Sair
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Formats */}
        <ScrollArea className="w-20 md:w-24 border-r border-border bg-card shrink-0">
          <div className="flex flex-col items-center gap-1 py-3 px-1">
            {/* Logo */}
            <div className="mb-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--header-start), var(--header-end))" }}>
                <span className="text-white text-xs font-bold">CO</span>
              </div>
              <p className="text-[10px] font-semibold text-foreground mt-1">Crie Oferta</p>
            </div>

            <Button
              variant="default"
              size="sm"
              className="w-full text-xs mb-2"
            >
              🎨 Temas
            </Button>

            <button className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 transition-colors">
              ▶ Video Aulas
            </button>
            <button className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 transition-colors">
              💎 Assinatura
            </button>

            <div className="w-full h-px bg-border my-2" />

            {formats.map((fmt) => {
              const Icon = fmt.icon;
              const isActive = selectedFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`w-full flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <div className={`w-10 h-12 border-2 rounded flex items-center justify-center ${
                    isActive ? "border-primary" : "border-border"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{fmt.label}</span>
                </button>
              );
            })}

            <div className="mt-auto pt-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-destructive py-2 transition-colors"
              >
                <LogOut className="w-3 h-3" /> Sair
              </button>
            </div>
          </div>
        </ScrollArea>

        {/* Action buttons column */}
        <div className="w-12 flex flex-col items-center gap-2 py-4 bg-card border-r border-border shrink-0">
          {[
            { icon: Plus, label: "Duplicar", color: "bg-primary" },
            { icon: FileText, label: "Copiar", color: "bg-primary" },
            { icon: LayoutGrid, label: "Grid", color: "bg-primary" },
            { icon: Share2, label: "Compartilhar", color: "bg-primary" },
            { icon: ZoomIn, label: "Zoom In", color: "bg-primary" },
            { icon: ZoomOut, label: "Zoom Out", color: "bg-primary" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className={`w-9 h-9 rounded-full ${color} text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex items-center justify-center bg-muted/50 overflow-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[600px] aspect-[3/4] bg-card rounded-lg shadow-xl border border-border relative overflow-hidden"
          >
            {/* Placeholder canvas content */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Image className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">Tema: {themeId}</p>
              <p className="text-xs text-muted-foreground">Clique em "+ PRODUTO" para adicionar itens</p>
            </div>

            {/* Footer bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-accent text-accent-foreground text-xs text-center py-1.5 font-medium">
              Oferta válida até <span className="font-bold">26/03/2026</span> ou enquanto durarem os estoques.
            </div>
          </motion.div>
        </div>

        {/* Right Panel */}
        <div className="w-72 lg:w-80 border-l border-border bg-card shrink-0 flex flex-col overflow-hidden">
          <Tabs defaultValue="produtos" className="flex flex-col flex-1 overflow-hidden">
            <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0 flex-shrink-0">
              {["temas", "produtos", "rodapé", "imagens", "logo/fonte"].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs py-2.5 uppercase tracking-wide"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="temas" className="p-4 mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="produtos" className="p-4 mt-0 space-y-4">
                {/* Product card */}
                <div className="border border-border rounded-lg p-3 space-y-3">
                  <div className="w-full aspect-square bg-muted rounded-md flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: Type, label: "Editar informações" },
                      { icon: Palette, label: "Cores e estilos" },
                      { icon: Image, label: "Alterar imagem" },
                      { icon: Tag, label: "Selo +18" },
                      { icon: Eye, label: "Ver mais imagens" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="w-full flex items-center gap-2 text-sm text-foreground hover:text-primary py-1.5 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                    <button className="w-full flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 py-1.5 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Remover produto
                    </button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rodapé" className="p-4 mt-0">
                <p className="text-sm text-muted-foreground">Configure o rodapé da sua oferta aqui.</p>
              </TabsContent>

              <TabsContent value="imagens" className="p-4 mt-0">
                <p className="text-sm text-muted-foreground">Gerencie as imagens do seu template.</p>
              </TabsContent>

              <TabsContent value="logo/fonte" className="p-4 mt-0">
                <p className="text-sm text-muted-foreground">Configure logo e fontes.</p>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Bottom actions */}
          <div className="border-t border-border p-3 flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              + PRODUTO
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              + LISTA
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs">
              + OPÇÕES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
