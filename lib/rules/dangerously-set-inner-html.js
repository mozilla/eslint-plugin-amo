'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description:
        'Ensure `dangerouslySetInnerHTML` is used on elements that permit flow content',
      recommended: true,
    },
    type: 'problem',
    messages: {
      invalidElementForSanitizeUserHTML:
        'Do not use `dangerouslySetInnerHTML` on `<{{ element }}>` when using `sanitizeUserHTML()`, use a `<div>`.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    return {
      JSXOpeningElement: (node) => {
        const { attributes, name } = node;

        const props = attributes.filter((attribute) => {
          if (!attribute.name || !attribute.name.name) {
            return false;
          }

          return attribute.name.name === 'dangerouslySetInnerHTML';
        });

        if (props.length !== 1) {
          return;
        }

        const prop = props[0];

        if (!prop.value.expression || !prop.value.expression.callee) {
          return;
        }

        const { callee } = prop.value.expression;

        if (name.name !== 'div' && callee.name === 'sanitizeUserHTML') {
          context.report({
            node,
            messageId: 'invalidElementForSanitizeUserHTML',
            data: {
              element: name.name,
            },
          });
        }
      },
    };
  },
};
