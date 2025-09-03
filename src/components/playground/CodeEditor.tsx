import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeFile {
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

const mockFiles: Record<string, CodeFile> = {
  "package.json": {
    path: "package.json",
    name: "package.json",
    language: "json",
    isDirty: false,
    content: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.1.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}`
  },
  "src/App.tsx": {
    path: "src/App.tsx",
    name: "App.tsx",
    language: "typescript",
    isDirty: true,
    content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <p>Welcome to my awesome project!</p>
      </header>
    </div>
  );
}

export default App;`
  }
};

// Syntax highlighting helper
const highlightSyntax = (code: string, language: string) => {
  const lines = code.split('\n');
  return lines.map((line, index) => {
    let highlightedLine = line;
    
    if (language === 'json') {
      highlightedLine = line
        .replace(/"([^"]+)":/g, '<span class="token property">"$1":</span>')
        .replace(/: "([^"]+)"/g, ': <span class="token string">"$1"</span>')
        .replace(/: (\d+\.?\d*)/g, ': <span class="token number">$1</span>')
        .replace(/: (true|false)/g, ': <span class="token boolean">$1</span>');
    } else if (language === 'typescript') {
      highlightedLine = line
        .replace(/\b(import|export|function|const|let|var|return|if|else|for|while|class|interface|type)\b/g, '<span class="token keyword">$1</span>')
        .replace(/'([^']*)'/g, '<span class="token string">\'$1\'</span>')
        .replace(/"([^"]*)"/g, '<span class="token string">"$1"</span>')
        .replace(/\/\/(.*)$/g, '<span class="token comment">//$1</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
    }
    
    return (
      <div key={index} className="flex">
        <div className="w-8 text-right pr-2 text-muted-foreground select-none text-xs leading-4">
          {index + 1}
        </div>
        <div 
          className="flex-1 leading-4 text-xs"
          dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }}
        />
      </div>
    );
  });
};

interface CodeEditorProps {
  selectedFile?: string;
  onFileChange?: (path: string, content: string) => void;
}

export function CodeEditor({ selectedFile, onFileChange }: CodeEditorProps) {
  const [openTabs, setOpenTabs] = useState<string[]>(["package.json", "src/App.tsx"]);
  const [activeTab, setActiveTab] = useState("package.json");
  
  const currentFile = selectedFile && mockFiles[selectedFile] ? mockFiles[selectedFile] : mockFiles[activeTab];

  const closeTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== path);
    setOpenTabs(newTabs);
    
    if (activeTab === path && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const openTab = (path: string) => {
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path]);
    }
    setActiveTab(path);
  };

  React.useEffect(() => {
    if (selectedFile && mockFiles[selectedFile]) {
      openTab(selectedFile);
    }
  }, [selectedFile]);

  const getFileIcon = (language: string) => {
    const colors = {
      json: "text-yellow-400",
      typescript: "text-blue-400",
      javascript: "text-yellow-500",
      css: "text-blue-300",
      html: "text-orange-400"
    };
    
    return <Circle className={cn("w-2 h-2 mr-1", colors[language as keyof typeof colors] || "text-muted-foreground")} fill="currentColor" />;
  };

  if (openTabs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <p>No files open</p>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Tab Bar */}
      <div className="flex items-center bg-card border-b border-border min-h-[28px]">
        {openTabs.map((tabPath) => {
          const file = mockFiles[tabPath];
          if (!file) return null;
          
          const isActive = activeTab === tabPath;
          
          return (
            <div
              key={tabPath}
              className={cn(
                "flex items-center px-2 py-1 border-r border-border cursor-pointer group text-xs min-w-0",
                isActive 
                  ? "bg-background text-foreground border-t-2 border-t-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              )}
              onClick={() => setActiveTab(tabPath)}
            >
              {getFileIcon(file.language)}
              <span className="truncate mr-1">{file.name}</span>
              {file.isDirty && (
                <Circle className="w-1.5 h-1.5 mr-1 text-foreground fill-current" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
                onClick={(e) => closeTab(tabPath, e)}
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto bg-background">
        {currentFile && (
          <div className="h-full font-mono">
            <div className="p-2">
              {highlightSyntax(currentFile.content, currentFile.language)}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-5 bg-card border-t border-border flex items-center justify-between px-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>TypeScript • React</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}