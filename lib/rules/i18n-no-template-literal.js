'use strict';

const { I18N_METHODS } = require('../i18n.js');

const toStaticString = (quasis) => {
  return quasis
    .map((quasi) => {
      let text = quasi.value.raw;
      text = text.replace(/'/g, "\\'"); // Escape single quotes
      text = text.replace(/"/g, '\\"'); // Escape double quotes
      return text;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
};

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description:
        'Ensure predictable static values are passed as i18n method arguments',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noStaticTemplate:
        'Do not use template literals on i18n.{{method}} for positional argument {{position}}. Use literal strings instead.',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        const { callee, arguments: args } = node;

        if (!callee.type === 'MemberExpression' || !args.length) {
          return;
        }

        const { object, property } = node.callee;

        if (object?.name !== 'i18n') {
          return;
        }

        const positions = I18N_METHODS[property.name] || [];

        positions.forEach((position) => {
          const arg = args[position];

          if (arg.type === 'TemplateLiteral') {
            // Template literal without dynamic placeholders
            const reportObject = {
              node,
              messageId: 'noStaticTemplate',
              data: {
                method: property.name,
                position,
              },
            };

            if (!arg.expressions || arg.expressions.length === 0) {
              reportObject.fix = (fixer) => {
                const fixedValue = toStaticString(arg.quasis);
                return fixer.replaceText(arg, `'${fixedValue}'`);
              };
            }

            context.report(reportObject);
          }
        });
      },
    };
  },
};
