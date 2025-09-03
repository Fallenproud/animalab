import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Square, 
  Code, 
  Settings, 
  User, 
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Share,
  Eye
} from "lucide-react";

interface PlaygroundHeaderProps {
  onRun: () => void;
  onPreview: () => void;
  isRunning: boolean;
}

export function PlaygroundHeader({ onRun, onPreview, isRunning }: PlaygroundHeaderProps) {
  return (
    <header className="h-9 bg-card border-b border-border flex items-center px-2 text-xs">
      {/* Left section - Navigation */}
      <div className="flex items-center gap-1 mr-4">
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground">
          <ChevronLeft className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground">
          <ChevronRight className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground">
          <RotateCcw className="w-3 h-3" />
        </Button>
      </div>

      {/* Project info */}
      <div className="flex items-center gap-2 mr-6">
        <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-[10px] text-primary-foreground font-bold">A</span>
        </div>
        <span className="text-foreground font-medium">My Awesome Project</span>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
          main
        </Badge>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-success border-success/30">
          v1.2.3
        </Badge>
      </div>

      {/* Center - Run controls */}
      <div className="flex items-center gap-1 mr-6">
        <Button
          onClick={onRun}
          disabled={isRunning}
          variant="default"
          size="sm"
          className="h-6 px-3 bg-success hover:bg-success/90 text-success-foreground text-xs"
        >
          <Play className="w-3 h-3 mr-1" />
          Run
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-3 text-xs text-muted-foreground"
        >
          <Code className="w-3 h-3 mr-1" />
          Code
        </Button>
        <Button
          onClick={onPreview}
          variant="ghost"
          size="sm"
          className="h-6 px-3 text-xs text-muted-foreground"
        >
          <Eye className="w-3 h-3 mr-1" />
          Preview
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-success">
          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
          <span>Live</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <User className="w-3 h-3" />
          <span>3 online</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Share className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="w-3 h-3" />
        </Button>
        <div className="flex items-center gap-1 ml-2">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-[10px] text-primary-foreground font-medium">A</span>
          </div>
          <span className="text-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}