import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Code, Copy, FileText, CheckCircle } from 'lucide-react';
import { SimpleMarkdownParser } from '@/lib/markdown';
import { useToast } from '@/hooks/use-toast';

interface MarkdownEditorProps {
  onMarkdownChange: (markdown: string) => void;
  onHtmlGenerated: (html: string) => void;
}

export const MarkdownEditor = ({ onMarkdownChange, onHtmlGenerated }: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Converter

Transform your **Markdown** into beautiful HTML with our live preview editor.

## ✨ Key Features

- **Real-time Preview** - See changes instantly
- **Professional Export** - Download styled HTML
- **Modern Interface** - Clean, responsive design
- **Full Markdown Support** - All standard syntax

### Code Example

\`\`\`javascript
// Modern ES6+ JavaScript
const converter = new MarkdownParser();
const result = converter.parse(markdown);
console.log(result);
\`\`\`

### Quick Lists

- Lightning fast conversion ⚡
- Mobile-friendly design 📱
- One-click export 📥
- Copy to clipboard 📋

### Important Notes

> **Pro Tip**: This converter supports all standard Markdown syntax including tables, code blocks, and more!

---

**Get started** by editing this text in the left panel. Your changes will appear instantly in the preview!`);

  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const parser = new SimpleMarkdownParser();

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    onMarkdownChange(value);
    const html = parser.parse(value);
    onHtmlGenerated(html);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Markdown content has been copied successfully.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Code className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Markdown Editor</span>
            <p className="text-xs text-slate-600 mt-0.5">Write your content here</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className={`transition-all duration-200 ${
            copied 
              ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' 
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      {/* Editor Textarea */}
      <div className="flex-1 relative">
        <Textarea
          value={markdown}
          onChange={(e) => handleMarkdownChange(e.target.value)}
          placeholder="# Start writing your markdown here...

Write your content and see it transform in real-time!"
          className="h-full resize-none border-0 rounded-none focus:ring-0 font-mono text-sm leading-relaxed p-4 bg-gradient-to-br from-slate-50/50 to-white"
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace",
          }}
        />
        
        {/* Character count */}
        <div className="absolute bottom-4 right-4 text-xs text-slate-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200/60">
          {markdown.length} characters
        </div>
      </div>
    </div>
  );
};