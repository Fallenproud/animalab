import { useState } from "react";

export interface CodeGenerationResult {
  code: string;
  timestamp: Date;
  tokens: number;
}

// Mock code generation service
export class CodeGenerationService {
  async generateCode(prompt: string): Promise<CodeGenerationResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Mock different responses based on prompt content
    const code = this.getCodeForPrompt(prompt);
    
    return {
      code,
      timestamp: new Date(),
      tokens: Math.floor(Math.random() * 1000) + 500
    };
  }

  private getCodeForPrompt(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('pricing') || lowerPrompt.includes('tier')) {
      return this.getPricingCardCode();
    }

    if (lowerPrompt.includes('hero') || lowerPrompt.includes('landing')) {
      return this.getHeroSectionCode();
    }

    if (lowerPrompt.includes('form') || lowerPrompt.includes('contact')) {
      return this.getContactFormCode();
    }

    if (lowerPrompt.includes('button')) {
      return this.getButtonCode();
    }

    // Default component
    return this.getDefaultComponentCode(prompt);
  }

  private getPricingCardCode(): string {
    return `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingCard() {
  return (
    <Card className="w-full max-w-sm p-6 bg-gradient-card border-border shadow-card">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Pro Plan</h3>
          <p className="text-muted-foreground">Perfect for professionals</p>
        </div>
        
        <div className="space-y-1">
          <div className="text-4xl font-bold text-primary">$29</div>
          <p className="text-muted-foreground">per month</p>
        </div>

        <ul className="space-y-3 text-left">
          {[
            "Unlimited components",
            "Advanced templates", 
            "Priority support",
            "Custom exports"
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full bg-gradient-primary hover:shadow-glow">
          Get Started
        </Button>
      </div>
    </Card>
  );
}`;
  }

  private getHeroSectionCode(): string {
    return `import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 text-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          New Feature Available
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            Build Amazing
          </span>
          <br />
          <span className="text-foreground">Experiences</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create stunning, responsive components with AI-powered design tools 
          that understand your vision and bring it to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}`;
  }

  private getContactFormCode(): string {
    return `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              placeholder="John Doe" 
              className="bg-background/50 border-border/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email"
              placeholder="john@example.com" 
              className="bg-background/50 border-border/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message"
              placeholder="Tell us about your project..." 
              className="min-h-[100px] bg-background/50 border-border/50"
            />
          </div>
          
          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </div>
    </Card>
  );
}`;
  }

  private getButtonCode(): string {
    return `import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function CustomButton() {
  return (
    <Button className="bg-gradient-primary hover:shadow-glow transition-smooth px-6 py-3">
      <Sparkles className="w-4 h-4 mr-2" />
      Click Me
    </Button>
  );
}`;
  }

  private getDefaultComponentCode(prompt: string): string {
    return `import { Card } from "@/components/ui/card";

export function GeneratedComponent() {
  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Generated Component
        </h3>
        <p className="text-muted-foreground">
          Based on: "${prompt}"
        </p>
        <div className="w-full h-32 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-medium">Component Content</span>
        </div>
      </div>
    </Card>
  );
}`;
  }
}

// React hook for code generation
export function useCodeGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const codeGenService = new CodeGenerationService();

  const generateCode = async (prompt: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await codeGenService.generateCode(prompt);
      setGeneratedCode(result.code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateCode,
    isLoading,
    generatedCode,
    error,
    clearCode: () => setGeneratedCode(""),
    clearError: () => setError("")
  };
}