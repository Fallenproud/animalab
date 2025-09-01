import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  FolderOpen, 
  File, 
  FileText, 
  Settings,
  ChevronRight,
  ChevronDown,
  Plus,
  MoreHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileItem[];
  isExpanded?: boolean;
}

const mockFiles: FileItem[] = [
  {
    name: "src",
    type: "folder",
    path: "src",
    isExpanded: true,
    children: [
      { name: "App.tsx", type: "file", path: "src/App.tsx" },
      { name: "index.css", type: "file", path: "src/index.css" },
      {
        name: "components",
        type: "folder", 
        path: "src/components",
        isExpanded: false,
        children: [
          { name: "Button.tsx", type: "file", path: "src/components/Button.tsx" },
          { name: "Card.tsx", type: "file", path: "src/components/Card.tsx" }
        ]
      }
    ]
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "README.md", type: "file", path: "README.md" }
];

interface FileExplorerProps {
  selectedFile?: string;
  onFileSelect: (filePath: string) => void;
}

export function FileExplorer({ selectedFile, onFileSelect }: FileExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState(mockFiles);

  const toggleFolder = (path: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.path === path && item.type === 'folder') {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };
    setFiles(updateFiles(files));
  };

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isSelected = selectedFile === item.path;
    const paddingLeft = depth * 16 + 12;

    return (
      <div key={item.path}>
        <div
          className={cn(
            "flex items-center h-6 text-sm cursor-pointer hover:bg-accent/50 group",
            isSelected && "bg-accent text-accent-foreground"
          )}
          style={{ paddingLeft }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.path);
            } else {
              onFileSelect(item.path);
            }
          }}
        >
          {item.type === 'folder' ? (
            <>
              {item.isExpanded ? (
                <ChevronDown className="w-3 h-3 mr-1" />
              ) : (
                <ChevronRight className="w-3 h-3 mr-1" />
              )}
              <FolderOpen className="w-4 h-4 mr-2 text-accent" />
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
            </>
          )}
          <span className="flex-1 truncate">{item.name}</span>
        </div>
        {item.type === 'folder' && item.isExpanded && item.children && (
          <div>
            {item.children.map(child => renderFileItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Project Explorer
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-7 pl-7 text-xs bg-background border-border"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {files.map(item => renderFileItem(item))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>2 items</span>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}