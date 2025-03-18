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
    type: 'suggestion',
    messages: {
      invalidDescription:
        'Use `__filename` in the description of the top-level `describe` block.',
    },
    fixable: 'code',
    schema: [],
  },

  create: (context) => {
    const SOURCE_CODE = context.sourceCode ?? context.getSourceCode();

    return {
      CallExpression: (node) => {
        const scope = SOURCE_CODE.getScope
          ? SOURCE_CODE.getScope(node)
          : context.getScope();

        if (!['global', 'module'].includes(scope.type)) {
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
