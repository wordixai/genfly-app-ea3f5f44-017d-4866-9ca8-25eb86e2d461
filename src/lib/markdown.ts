export interface MarkdownParser {
  parse(markdown: string): string;
}

export class SimpleMarkdownParser implements MarkdownParser {
  parse(markdown: string): string {
    let html = markdown;

    // Headers (# ## ### #### ##### ######)
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Code blocks (```language ... ```)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language ? ` class="language-${language}"` : '';
      return `<pre><code${lang}>${this.escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code (`code`)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold (**text** or __text__)
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    // Italic (*text* or _text_)
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Images ![alt](src)
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    // Unordered lists (- or *)
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists (1. 2. 3.)
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

    // Blockquotes (> text)
    html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal rules (--- or ***)
    html = html.replace(/^(---|\*\*\*)$/gm, '<hr />');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/^\s*(.+)\s*$/, '<p>$1</p>');

    // Clean up multiple consecutive tags
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    html = html.replace(/<\/ol>\s*<ol>/g, '');
    html = html.replace(/<\/blockquote>\s*<blockquote>/g, '<br>');

    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}