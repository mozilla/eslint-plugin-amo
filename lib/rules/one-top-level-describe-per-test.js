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
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const SOURCE_CODE = context.sourceCode ?? context.getSourceCode();

    let numberOfDescribe = 0;

    return {
      CallExpression: (node) => {
        const scope = SOURCE_CODE.getScope
          ? SOURCE_CODE.getScope(node)
          : context.getScope();

        if (!['global', 'module'].includes(scope.type)) {
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
