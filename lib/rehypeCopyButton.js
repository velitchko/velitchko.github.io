import { visit } from 'unist-util-visit';

/**
 * rehype plugin to add a copy button to each code block
 */
export default function rehypeCopyButton() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children && node.children.some(child => child.tagName === 'code')) {
        // Add a button as the first child of <pre>
        node.children.unshift({
          type: 'element',
          tagName: 'button',
          properties: {
            className: ['copy-code-btn'],
            'data-code-copy': 'true',
            title: 'Copy code',
            type: 'button',
            tabIndex: 0
          },
          children: [
            // Copy icon
            {
              type: 'element',
              tagName: 'svg',
              properties: {
                className: ['copy-icon'],
                xmlns: 'http://www.w3.org/2000/svg',
                width: 20,
                height: 20,
                fill: 'none',
                viewBox: '0 0 24 24',
                style: 'vertical-align: middle; margin-right: 0.1em; pointer-events: none;'
              },
              children: [
                { type: 'element', tagName: 'rect', properties: { x: 9, y: 9, width: 13, height: 13, rx: 2, fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, children: [] },
                { type: 'element', tagName: 'rect', properties: { x: 3, y: 3, width: 13, height: 13, rx: 2, fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, children: [] }
              ]
            },
            // Checkmark icon (hidden by default)
            {
              type: 'element',
              tagName: 'svg',
              properties: {
                className: ['checkmark-icon'],
                xmlns: 'http://www.w3.org/2000/svg',
                width: 20,
                height: 20,
                fill: 'none',
                viewBox: '0 0 24 24',
                style: 'vertical-align: middle; margin-right: 0.1em; pointer-events: none;'
              },
              children: [
                { type: 'element', tagName: 'path', properties: { d: 'M5 13l4 4L19 7', stroke: 'currentColor', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, children: [] }
              ]
            }
          ]
        });
      }
    });
  };
}
