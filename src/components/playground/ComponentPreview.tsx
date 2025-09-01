import { useMemo } from "react";

interface ComponentPreviewProps {
  code?: string;
}

export function ComponentPreview({ code }: ComponentPreviewProps) {
  // In a real implementation, this would safely evaluate the JSX code
  // For now, we'll show a mock preview
  const previewContent = useMemo(() => {
    if (!code) return null;

    // Mock component rendering based on code content
    if (code.includes('pricing') || code.includes('Pricing')) {
      return <MockPricingCard />;
    }
    
    if (code.includes('hero') || code.includes('Hero')) {
      return <MockHeroSection />;
    }
    
    if (code.includes('form') || code.includes('Form')) {
      return <MockContactForm />;
    }

    // Default component
    return <MockDefaultComponent />;
  }, [code]);

  if (!code) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <div className="text-4xl">👁️</div>
          <p>Component preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-background/30 rounded-lg p-6">
      {previewContent}
    </div>
  );
}

// Mock components for preview
function MockPricingCard() {
  return (
    <div className="max-w-sm mx-auto bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-foreground">Pro Plan</h3>
        <div className="text-3xl font-bold text-primary">$29<span className="text-lg text-muted-foreground">/mo</span></div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Unlimited components</li>
          <li>✓ Advanced templates</li>
          <li>✓ Priority support</li>
        </ul>
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-2 px-4 hover:opacity-90 transition-smooth">
          Get Started
        </button>
      </div>
    </div>
  );
}

function MockHeroSection() {
  return (
    <div className="text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
        Welcome to the Future
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Experience the next generation of web development with our innovative platform.
      </p>
      <button className="bg-primary text-primary-foreground rounded-lg py-3 px-6 hover:opacity-90 transition-smooth">
        Explore Now
      </button>
    </div>
  );
}

function MockContactForm() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-4">Contact Us</h3>
      <div className="space-y-4">
        <input 
          className="w-full p-3 bg-background border border-border rounded-lg" 
          placeholder="Your Name" 
        />
        <input 
          className="w-full p-3 bg-background border border-border rounded-lg" 
          placeholder="Your Email" 
        />
        <textarea 
          className="w-full p-3 bg-background border border-border rounded-lg h-24 resize-none" 
          placeholder="Your Message" 
        />
        <button className="w-full bg-primary text-primary-foreground rounded-lg py-3 px-4 hover:opacity-90 transition-smooth">
          Send Message
        </button>
      </div>
    </div>
  );
}

function MockDefaultComponent() {
  return (
    <div className="text-center space-y-4 py-8">
      <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto flex items-center justify-center text-2xl">
        ✨
      </div>
      <h3 className="text-lg font-semibold text-foreground">Generated Component</h3>
      <p className="text-muted-foreground">
        Your AI-generated component preview appears here
      </p>
    </div>
  );
}