import { exposeMarkdown } from '@hashbrownai/angular';

/** Built-in streaming Markdown renderer for generative UI (Hashbrown 0.5). */
export const AiMarkdown = exposeMarkdown({
  name: 'Markdown',
  description:
    'Short Markdown summary for the shopper (headings, lists, links, emphasis). Put the markdown string in the children prop. Prefer this for prose; use product list/card components for visual catalog results.',
});
