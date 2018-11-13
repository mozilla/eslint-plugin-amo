'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensure we do not log full objects',
      githubIssue: 'https://github.com/mozilla/addons-frontend/issues/6512',
      recommended: true,
    },
    messages: {
      error:
        'We do not recommend to log objects. Make sure it is really what you want to do.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const LOGGER_OBJECTS = ['log', '_log'];
    const LOGGER_METHODS = ['fatal', 'info', 'error', 'warn', 'debug'];
    const NON_LITERAL_TYPES = [
      'TaggedTemplateExpression',
      'TemplateLiteral',
      'Literal',
    ];

    return {
      CallExpression: (node) => {
        const { arguments: args, callee } = node;

        if (!callee || !callee.object || !callee.property) {
          return;
        }

        if (
          !LOGGER_OBJECTS.includes(callee.object.name) &&
          (callee.object.property &&
            !LOGGER_OBJECTS.includes(callee.object.property.name))
        ) {
          return;
        }

        if (!LOGGER_METHODS.includes(callee.property.name)) {
          return;
        }

        const nonLiteralArgs = args.filter(
          (arg) => NON_LITERAL_TYPES.includes(arg.type) === false
        );

        if (nonLiteralArgs.length !== 0) {
          context.report({ node, messageId: 'error' });
        }
      },
    };
  },
};
