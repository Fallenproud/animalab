import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // When selectedFile changes, open it in a tab
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
    
    return <Circle className={cn("w-2 h-2 mr-2", colors[language as keyof typeof colors] || "text-muted-foreground")} />;
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
      <div className="flex items-center bg-card border-b border-border min-h-[32px]">
        {openTabs.map((tabPath) => {
          const file = mockFiles[tabPath];
          if (!file) return null;
          
          const isActive = activeTab === tabPath;
          
          return (
            <div
              key={tabPath}
              className={cn(
                "flex items-center px-3 py-1 border-r border-border cursor-pointer group text-sm min-w-0",
                isActive 
                  ? "bg-background text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              onClick={() => setActiveTab(tabPath)}
            >
              {getFileIcon(file.language)}
              <span className="truncate mr-2">{file.name}</span>
              {file.isDirty && (
                <Circle className="w-2 h-2 mr-1 text-accent fill-current" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive"
                onClick={(e) => closeTab(tabPath, e)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {currentFile && (
          <div className="h-full">
            <div className="h-full bg-background">
              <textarea
                value={currentFile.content}
                onChange={(e) => onFileChange?.(currentFile.path, e.target.value)}
                className="w-full h-full p-4 bg-background text-foreground font-mono text-sm border-none outline-none resize-none"
                style={{ tabSize: 2 }}
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-accent/30 border-t border-border flex items-center justify-between px-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>TypeScript • React</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}