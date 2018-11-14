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
    schema: [
      {
        type: 'object',
        properties: {
          methods: {
            description: 'A list of logger methods, e.g., `info` or `debug`.',
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
          objects: {
            description: 'A list of logger objects, e.g., `log` or `console`.',
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: (context) => {
    const { methods, objects } = context.options[0] || {};
    const LOGGER_OBJECTS = objects || ['log', '_log'];
    const LOGGER_METHODS = methods || [
      'fatal',
      'info',
      'error',
      'warn',
      'debug',
    ];

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
