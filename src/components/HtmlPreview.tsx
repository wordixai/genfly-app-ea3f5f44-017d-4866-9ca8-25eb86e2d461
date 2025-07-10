import { Button } from '@/components/ui/button';
import { Download, Eye, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface HtmlPreviewProps {
  html: string;
  markdown: string;
}

export const HtmlPreview = ({ html, markdown }: HtmlPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const downloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Markdown</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            max-width: 900px;
            margin: 0 auto;
            padding: 3rem 2rem;
            color: #2d3748;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            min-height: 100vh;
        }
        
        .container {
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #1a202c;
            margin: 2rem 0 1rem 0;
            font-weight: 700;
            line-height: 1.25;
        }
        
        h1 { 
            font-size: 2.5rem; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2 { font-size: 2rem; color: #2d3748; }
        h3 { font-size: 1.5rem; color: #4a5568; }
        h4 { font-size: 1.25rem; color: #4a5568; }
        h5 { font-size: 1.125rem; color: #718096; }
        h6 { font-size: 1rem; color: #718096; }
        
        p { 
            margin-bottom: 1.5rem; 
            color: #4a5568;
            font-size: 1.05rem;
        }
        
        strong {
            color: #2d3748;
            font-weight: 600;
        }
        
        em {
            color: #4a5568;
            font-style: italic;
        }
        
        code {
            background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
            font-size: 0.9rem;
            color: #e53e3e;
            border: 1px solid #cbd5e0;
        }
        
        pre {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            padding: 1.5rem;
            border-radius: 12px;
            overflow-x: auto;
            margin: 1.5rem 0;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        pre code {
            background: transparent;
            padding: 0;
            color: #e2e8f0;
            border: none;
            font-size: 0.95rem;
        }
        
        blockquote {
            border-left: 4px solid #3182ce;
            background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            color: #2c5282;
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }
        
        ul, ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }
        
        li { 
            margin-bottom: 0.75rem;
            color: #4a5568;
        }
        
        a {
            color: #3182ce;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: all 0.2s ease;
        }
        
        a:hover {
            color: #2c5282;
            border-bottom-color: #3182ce;
        }
        
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(135deg, transparent 0%, #cbd5e0 50%, transparent 100%);
            margin: 3rem 0;
        }
        
        img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin: 1.5rem 0;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            body {
                padding: 1rem;
            }
            
            .container {
                padding: 1.5rem;
            }
            
            h1 { font-size: 2rem; }
            h2 { font-size: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${html}
    </div>
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
    
    toast({
      title: "Download started!",
      description: "Your HTML file is being downloaded.",
    });
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast({
        title: "HTML copied!",
        description: "The HTML code has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy HTML to clipboard.",
        variant: "destructive",
      });
    }
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Markdown Preview</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem;
                color: #333;
              }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50/50 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">Live Preview</span>
            <p className="text-xs text-slate-600 mt-0.5">Real-time HTML output</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewTab}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyHtml}
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
                Copy HTML
              </>
            )}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={downloadHtml}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50/50 to-white">
        <div className="p-6">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.7',
              color: '#334155'
            }}
          />
        </div>
      </div>
    </div>
  );
};