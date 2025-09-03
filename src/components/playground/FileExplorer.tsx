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
  MoreHorizontal,
  Folder
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
    const paddingLeft = depth * 12 + 8;

    return (
      <div key={item.path}>
        <div
          className={cn(
            "flex items-center h-5 text-xs cursor-pointer hover:bg-accent/20 group",
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
                <ChevronDown className="w-3 h-3 mr-1 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-3 h-3 mr-1 text-muted-foreground" />
              )}
              <Folder className="w-3 h-3 mr-1 text-primary/80" />
            </>
          ) : (
            <>
              <div className="w-4 mr-1" />
              <FileText className="w-3 h-3 mr-1 text-muted-foreground" />
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
    <div className="w-48 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-foreground uppercase tracking-wide">
            Project Explorer
          </span>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
              <Plus className="w-2.5 h-2.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
              <MoreHorizontal className="w-2.5 h-2.5" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-5 pl-6 text-xs bg-input border-border"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-1">
        {files.map(item => renderFileItem(item))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>2 items</span>
          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
            <Settings className="w-2.5 h-2.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}