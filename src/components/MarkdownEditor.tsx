import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Download, Eye, Code, Copy } from 'lucide-react';
import { SimpleMarkdownParser } from '@/lib/markdown';

interface MarkdownEditorProps {
  onMarkdownChange: (markdown: string) => void;
  onHtmlGenerated: (html: string) => void;
}

export const MarkdownEditor = ({ onMarkdownChange, onHtmlGenerated }: MarkdownEditorProps) => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Converter

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

Try editing the markdown on the left to see the live preview!`);

  const parser = new SimpleMarkdownParser();

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
    onMarkdownChange(value);
    const html = parser.parse(value);
    onHtmlGenerated(html);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="font-medium">Markdown Editor</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy
        </Button>
      </div>
      <Textarea
        value={markdown}
        onChange={(e) => handleMarkdownChange(e.target.value)}
        placeholder="Enter your markdown here..."
        className="flex-1 resize-none border-0 rounded-none focus:ring-0 font-mono text-sm"
      />
    </div>
  );
};