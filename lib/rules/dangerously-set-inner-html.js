'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description:
        'Use `dangerouslySetInnerHTML` on elements that permit flow content',
      recommended: true,
    },
    messages: {
      invalidElement:
        'Do not use `dangerouslySetInnerHTML` on `<{{ element }}>` because it does permit flow content.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const PERMIT_FLOW_CONTENT = ['div'];

    return {
      JSXOpeningElement: (node) => {
        const { attributes, name } = node;

        const hasDangerouslySetInnerHTML = attributes.filter((attribute) => {
          if (!attribute.name || !attribute.name.name) {
            return false;
          }

          return attribute.name.name === 'dangerouslySetInnerHTML';
        }).length;

        if (!hasDangerouslySetInnerHTML || !name || !name.name) {
          return;
        }

        if (!PERMIT_FLOW_CONTENT.includes(name.name)) {
          context.report({
            node,
            messageId: 'invalidElement',
            data: {
              element: name.name,
            },
          });
        }
      },
    };
  },
};
