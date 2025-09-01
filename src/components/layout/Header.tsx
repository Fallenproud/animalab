import { Button } from "@/components/ui/button";
import { Code, Sparkles } from "lucide-react";

interface HeaderProps {
  onPlaygroundClick?: () => void;
}

export function Header({ onPlaygroundClick }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            <Code className="w-8 h-8 text-primary" />
            AnimaLab
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Features
          </a>
          <a href="#examples" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Examples
          </a>
          <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={onPlaygroundClick}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Playground
          </Button>
        </div>
      </div>
    </header>
  );
}