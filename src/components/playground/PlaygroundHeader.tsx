import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Code, Settings, User } from "lucide-react";

interface PlaygroundHeaderProps {
  onRun: () => void;
  onPreview: () => void;
  isRunning: boolean;
}

export function PlaygroundHeader({ onRun, onPreview, isRunning }: PlaygroundHeaderProps) {
  return (
    <header className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-primary rounded-sm flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Anything</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>My Awesome Project</span>
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            main
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            v1.2.3
          </Badge>
        </div>
      </div>

      {/* Center section - Run controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onRun}
          disabled={isRunning}
          variant="default"
          size="sm"
          className="bg-success hover:bg-success/90 text-success-foreground"
        >
          <Play className="w-3 h-3 mr-1" />
          Run
        </Button>
        <Button
          onClick={onPreview}
          variant="outline"
          size="sm"
          className="border-border"
        >
          Preview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <Square className="w-3 h-3" />
        </Button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>Live</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="w-3 h-3" />
          <span>3 online</span>
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-medium">A</span>
          </div>
          <span className="text-sm text-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}