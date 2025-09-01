import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Code2 } from "lucide-react";

interface HeroProps {
  onGetStarted?: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-sm text-muted-foreground">
            <Zap className="w-4 h-4 text-primary" />
            Powered by AI • Real-time Code Generation
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Design to Code
            </span>
            <br />
            <span className="text-foreground">in Seconds</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your designs into production-ready code instantly. 
            Anima Lab uses advanced AI to convert your wireframes, mockups, 
            and ideas into clean, responsive React components.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGetStarted}
              className="flex items-center gap-3 px-8 py-6 text-lg shadow-glow"
            >
              <Code2 className="w-5 h-5" />
              Try Playground
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>10k+ Components Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Sub-second Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}