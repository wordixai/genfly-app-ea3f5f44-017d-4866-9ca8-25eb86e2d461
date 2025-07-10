import { useState } from 'react';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { HtmlPreview } from '@/components/HtmlPreview';
import { SimpleMarkdownParser } from '@/lib/markdown';
import { Toaster } from '@/components/ui/toaster';

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
  useState(() => {
    const defaultMarkdown = `# Welcome to Markdown Converter

This is a **live preview** markdown to HTML converter.

## Features

- **Headers** (H1 to H6)
- **Bold** and *italic* text
- [Links](https://example.com)
- \`Inline code\`

### Code Blocks

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3

### Blockquotes

> This is a blockquote
> It can span multiple lines

---

Try editing the markdown on the left to see the live preview!`;
    
    setMarkdown(defaultMarkdown);
    setHtml(parser.parse(defaultMarkdown));
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Markdown to HTML Converter</h1>
        <p className="text-gray-600 mt-1">Convert Markdown text to HTML with live preview</p>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200">
          <MarkdownEditor 
            onMarkdownChange={handleMarkdownChange}
            onHtmlGenerated={handleHtmlGenerated}
          />
        </div>
        
        <div className="w-1/2">
          <HtmlPreview 
            html={html}
            markdown={markdown}
          />
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Index;