'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensures the `withRouter` HOC is the first in `compose()`',
      githubIssue: null,
      recommended: true,
    },
    messages: {
      error: 'The `withRouter` HOC should be the first HOC in `compose()`',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    return {
      CallExpression: (node) => {
        const { arguments: args, callee } = node;

        if (!callee) {
          return;
        }

        if (callee.callee) {
          const hasWithRouterHOC =
            args.findIndex((arg) => {
              return arg.callee && arg.callee.name === 'withRouter';
            }) !== -1;

          if (hasWithRouterHOC) {
            context.report({
              node,
              messageId: 'error',
            });
          }

          return;
        }

        if (callee.name !== 'compose' || args.length < 2) {
          return;
        }

        const hasWithRouterHOC =
          args.findIndex((arg) => arg.name === 'withRouter') !== -1;

        if (hasWithRouterHOC && args[0].name !== 'withRouter') {
          context.report({
            node,
            messageId: 'error',
          });
        }
      },
    };
  },
};
