'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description:
        'Ensure there is a single top-level `describe` block per test file',
      recommended: true,
    },
    messages: {
      error: 'Use only one top-level `describe` block in your test file.',
    },
    fixable: true,
    schema: [],
  },

  create: (context) => {
    let numberOfDescribe = 0;

    return {
      CallExpression: (node) => {
        if (!['global', 'module'].includes(context.getScope().type)) {
          return;
        }

        if (node.callee.name === 'describe') {
          numberOfDescribe++;
        }
      },
      'Program:exit': (node) => {
        if (numberOfDescribe > 1) {
          context.report({
            node,
            messageId: 'error',
          });
        }
      },
    };
  },
};
