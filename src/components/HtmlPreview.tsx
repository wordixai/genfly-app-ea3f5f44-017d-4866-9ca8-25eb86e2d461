import { Button } from '@/components/ui/button';
import { Download, Eye, Copy } from 'lucide-react';

interface HtmlPreviewProps {
  html: string;
  markdown: string;
}

export const HtmlPreview = ({ html, markdown }: HtmlPreviewProps) => {
  const downloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        h1 { font-size: 2.5rem; }
        h2 { font-size: 2rem; }
        h3 { font-size: 1.5rem; }
        h4 { font-size: 1.25rem; }
        h5 { font-size: 1.125rem; }
        h6 { font-size: 1rem; }
        p { margin-bottom: 1rem; }
        code {
            background-color: #f4f4f4;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
        }
        pre {
            background-color: #f8f8f8;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 1rem 0;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        blockquote {
            border-left: 4px solid #3498db;
            margin: 1rem 0;
            padding-left: 1rem;
            color: #666;
        }
        ul, ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        li { margin-bottom: 0.5rem; }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 2rem 0;
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-markdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(html);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="font-medium">Live Preview</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyHtml}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy HTML
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={downloadHtml}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.6',
            color: '#333'
          }}
        />
      </div>
    </div>
  );
};