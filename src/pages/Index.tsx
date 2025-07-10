import { useState, useEffect } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { HtmlPreview } from '@/components/HtmlPreview';
import { SimpleMarkdownParser } from '@/lib/markdown';
import { Toaster } from '@/components/ui/toaster';
import { FileText, Zap, Settings, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const parser = new SimpleMarkdownParser();

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
  };

  const handleHtmlGenerated = (newHtml: string) => {
    setHtml(newHtml);
  };

  // Initialize with default content
  useEffect(() => {
    const defaultMarkdown = `# Welcome to Markdown Converter

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

**Get started** by editing this text in the left panel. Your changes will appear instantly in the preview!`;
    
    setMarkdown(defaultMarkdown);
    setHtml(parser.parse(defaultMarkdown));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Markdown Converter
                </h1>
                <p className="text-sm text-slate-600 font-medium">
                  Transform Markdown to HTML with live preview
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-4 flex items-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3 text-yellow-500" />
              <span>Live Preview</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Real-time Conversion</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>Professional Export</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Editor Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <MarkdownEditor 
              onMarkdownChange={handleMarkdownChange}
              onHtmlGenerated={handleHtmlGenerated}
            />
          </div>
          
          {/* Preview Panel */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <HtmlPreview 
              html={html}
              markdown={markdown}
            />
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Built with modern web technologies • Supports all standard Markdown syntax
          </p>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;