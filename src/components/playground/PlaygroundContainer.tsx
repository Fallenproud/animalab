import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Copy, Download, Sparkles, Code } from "lucide-react";
import { useCodeGeneration } from "@/services/codeGeneration";
import { CodePreview } from "./CodePreview";
import { ComponentPreview } from "./ComponentPreview";

export function PlaygroundContainer() {
  const [prompt, setPrompt] = useState("");
  const { generateCode, isLoading, generatedCode, error } = useCodeGeneration();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateCode(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Code className="w-6 h-6 text-primary" />
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Playground
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Input Panel */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Describe Your Component
                  </h3>
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                
                <Textarea
                  placeholder="Describe the component you want to create... 

Examples:
• A modern pricing card with three tiers
• A hero section with gradient background  
• A contact form with validation
• A product showcase carousel

Press Ctrl+Enter to generate"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[300px] resize-none bg-background/50 border-border/50 focus:border-primary/50 transition-smooth"
                />
                
                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isLoading}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Generate Component
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <Card className="flex-1 overflow-hidden bg-gradient-card border-border/50 shadow-card">
              <Tabs defaultValue="preview" className="h-full flex flex-col">
                <div className="border-b border-border/50 px-6 py-3">
                  <TabsList className="bg-background/50">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="preview" className="h-full m-0 p-6">
                    <ComponentPreview code={generatedCode} />
                  </TabsContent>
                  
                  <TabsContent value="code" className="h-full m-0 p-0">
                    <CodePreview code={generatedCode} />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}