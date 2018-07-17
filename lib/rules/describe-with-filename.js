'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description:
        'Ensure the top-level `describe` block has `__filename` as description',
      githubIssue: 'https://github.com/mozilla/addons-frontend/issues/2928',
      recommended: true,
    },
    messages: {
      invalidDescription:
        'Use `__filename` in the description of the top-level `describe` block.',
    },
    fixable: true,
    schema: [],
  },

  create: (context) => {
    return {
      CallExpression: (node) => {
        if (!['global', 'module'].includes(context.getScope().type)) {
          return;
        }

        const name = node.callee.name;
        const args = node.arguments;

        if (
          name === 'describe' &&
          args.length &&
          args[0].name !== '__filename'
        ) {
          context.report({
            node,
            messageId: 'invalidDescription',
            fix: (fixer) => {
              return fixer.replaceText(args[0], '__filename');
            },
          });
        }
      },
    };
  },
};
