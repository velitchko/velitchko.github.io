import { visit } from 'unist-util-visit';

/**
 * Wrap Markdown tables in their own horizontal scroll container.
 *
 * Tables can legitimately be wider than a phone, but they must not widen the
 * document itself. Keeping the table intact inside this wrapper preserves its
 * columns while constraining horizontal scrolling to the table.
 */
export default function rehypeTableScroll() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || typeof index !== 'number' || node.tagName !== 'table') {
        return;
      }

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-scroll'] },
        children: [node],
      };
    });
  };
}
