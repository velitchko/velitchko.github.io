import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkHtml from 'remark-html';
import rehypeHighlight from 'rehype-highlight';
import rehypeCopyButton from './rehypeCopyButton';

// ...existing imports and code...

// Replace the markdown-to-HTML pipeline with syntax highlighting and copy button
export async function markdownToHtml(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkHtml, { sanitize: false })
    .use(rehypeHighlight)
    .use(rehypeCopyButton)
    .process(content);
  return processedContent.toString();
}
