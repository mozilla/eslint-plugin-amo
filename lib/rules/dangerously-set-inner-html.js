"use strict";

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Use `dangerouslySetInnerHTML` on elements that permit flow content',
      recommended: true,
    },
    messages: {
      invalidElement: 'Do not use `dangerouslySetInnerHTML` on "<{{ element }}>" because it does permit flow content.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const FLOW_CONTENT_ELEMENTS = ['div'];

    return {
      JSXOpeningElement: (node) => {
        const { attributes, name } = node;

        if (!attributes.filter((attribute) => attribute.name.name === 'dangerouslySetInnerHTML').length) {
          return;
        }

        if (!FLOW_CONTENT_ELEMENTS.includes(name.name)) {
          context.report({
            node,
            messageId: 'invalidElement',
            data: {
              element: name.name
            },
          });
        }
      },
    }
  },
};
