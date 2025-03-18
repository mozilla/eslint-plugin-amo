'use strict';

const { I18N_METHODS } = require('../i18n.js');

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensure no interpolated values are passed to i18n methods',
      recommended: true,
    },
    type: 'problem',
    messages: {
      noInterpolatedValues:
        'Do not use interpolated values (e.g. `${variable}`) when calling a `i18n` method.',
    },
    schema: [],
  },

  create: (context) => {
    return {
      CallExpression: (node) => {
        const { callee, arguments: args } = node;

        if (!callee.type === 'MemberExpression' || !args.length) {
          return;
        }

        const { object, property } = node.callee;

        if (!object || !object.name || object.name !== 'i18n') {
          return;
        }

        const positions = I18N_METHODS[property.name] || [];

        positions.forEach((position) => {
          const arg = args[position];

          if (arg.type !== 'TemplateLiteral') {
            return;
          }

          if (arg.expressions.length > 0) {
            context.report({
              node,
              messageId: 'noInterpolatedValues',
              data: {},
            });
          }
        });
      },
    };
  },
};
