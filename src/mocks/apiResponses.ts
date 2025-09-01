// Mock API responses for testing and development

export interface MockCodeResponse {
  success: boolean;
  data: {
    code: string;
    language: string;
    framework: string;
    tokens: number;
    processingTime: number;
  };
  timestamp: string;
}

export interface MockErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
  timestamp: string;
}

export const mockSuccessResponses: MockCodeResponse[] = [
  {
    success: true,
    data: {
      code: `import { Button } from "@/components/ui/button";

export function WelcomeButton() {
  return (
    <Button className="bg-gradient-primary hover:shadow-glow">
      Welcome to AnimalLab
    </Button>
  );
}`,
      language: "tsx",
      framework: "react",
      tokens: 245,
      processingTime: 850
    },
    timestamp: new Date().toISOString()
  },
  {
    success: true,
    data: {
      code: `import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeatureCard({ title, description, isNew = false }) {
  return (
    <Card className="p-6 bg-gradient-card border-border shadow-card">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {isNew && <Badge variant="secondary">New</Badge>}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}`,
      language: "tsx",
      framework: "react",
      tokens: 380,
      processingTime: 1200
    },
    timestamp: new Date().toISOString()
  }
];

export const mockErrorResponses: MockErrorResponse[] = [
  {
    success: false,
    error: {
      code: "INVALID_PROMPT",
      message: "The prompt is too short or unclear",
      details: "Please provide a more detailed description of the component you want to create."
    },
    timestamp: new Date().toISOString()
  },
  {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED", 
      message: "Too many requests",
      details: "Please wait a moment before generating another component."
    },
    timestamp: new Date().toISOString()
  },
  {
    success: false,
    error: {
      code: "GENERATION_FAILED",
      message: "Code generation failed",
      details: "An error occurred while processing your request. Please try again."
    },
    timestamp: new Date().toISOString()
  }
];

// Utility to get random mock response
export function getRandomMockResponse(): MockCodeResponse | MockErrorResponse {
  // 90% success rate
  const isSuccess = Math.random() > 0.1;
  
  if (isSuccess) {
    return mockSuccessResponses[Math.floor(Math.random() * mockSuccessResponses.length)];
  } else {
    return mockErrorResponses[Math.floor(Math.random() * mockErrorResponses.length)];
  }
}

// Mock API delay simulation
export function simulateApiDelay(min = 800, max = 2000): Promise<void> {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
}