import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodePreviewProps {
  code?: string;
}

export function CodePreview({ code }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <div className="text-4xl">⚡</div>
          <p>Generated code will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="bg-background/80 backdrop-blur-sm"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      <pre className="h-full overflow-auto p-6 bg-background/30 text-sm font-mono">
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  );
}