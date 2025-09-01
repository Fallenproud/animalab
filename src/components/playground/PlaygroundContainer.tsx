import { useState } from "react";
import { PlaygroundHeader } from "./PlaygroundHeader";
import { FileExplorer } from "./FileExplorer";
import { CodeEditor } from "./CodeEditor";
import { AIAssistant } from "./AIAssistant";
import { useCodeGeneration } from "@/services/codeGeneration";

export function PlaygroundContainer() {
  const [selectedFile, setSelectedFile] = useState<string>("package.json");
  const { generateCode, isLoading, generatedCode, error } = useCodeGeneration();

  const handleRun = () => {
    console.log("Running code...");
    // Here you would implement the actual run functionality
  };

  const handlePreview = () => {
    console.log("Opening preview...");
    // Here you would implement the preview functionality
  };

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  const handleFileChange = (path: string, content: string) => {
    console.log("File changed:", path, content);
    // Here you would implement file content updates
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Header */}
      <PlaygroundHeader 
        onRun={handleRun}
        onPreview={handlePreview}
        isRunning={isLoading}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Explorer */}
        <FileExplorer 
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
        />

        {/* Center - Code Editor */}
        <CodeEditor 
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
        />

        {/* Right Sidebar - AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
}