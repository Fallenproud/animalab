import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  User, 
  Bot,
  Clock,
  Settings,
  Minimize2,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI development assistant. I can help you build, modify, and optimize your application. What would you like to work on today?",
    sender: "assistant",
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  }
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you want to work on that. Let me help you implement this feature. I'll need to analyze your current code structure first.",
        sender: "assistant", 
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('no-NO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-64 bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-2 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-foreground">AI Assistant</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Badge variant="secondary" className="text-[10px] px-1 py-0">
              Enterprise AI • Always learning
            </Badge>
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
              <ChevronDown className="w-2.5 h-2.5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
          <span>AI Online</span>
          <span>•</span>
          <span>2 min ago</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-2",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.sender === 'assistant' && (
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            )}
            
            <div className={cn(
              "max-w-[75%] rounded-md px-2 py-1 text-xs",
              message.sender === 'user' 
                ? "bg-primary text-primary-foreground ml-6" 
                : "bg-muted text-foreground"
            )}>
              <p className="leading-relaxed">{message.content}</p>
              <p className={cn(
                "text-[10px] mt-0.5 opacity-70",
                message.sender === 'user' ? "text-primary-foreground" : "text-muted-foreground"
              )}>
                {formatTime(message.timestamp)}
              </p>
            </div>

            {message.sender === 'user' && (
              <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-2.5 h-2.5 text-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-2.5 h-2.5 text-primary-foreground" />
            </div>
            <div className="bg-muted text-foreground rounded-md px-2 py-1 text-xs">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                </div>
                <span className="text-muted-foreground ml-1">AI is typing...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-border">
        <div className="flex gap-1 mb-1">
          <Input
            placeholder="Describe what you want to build, modify, or optimize..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-xs h-6"
          />
          <Button 
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="px-2 h-6"
          >
            <Send className="w-2.5 h-2.5" />
          </Button>
        </div>
        
        <p className="text-[10px] text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}