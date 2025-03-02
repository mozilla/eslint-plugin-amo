'use strict';

const { I18N_METHODS } = require('../i18n.js');

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensure no template literal tags are passed to i18n methods',
      githubIssue: 'https://github.com/mozilla/addons-frontend/issues/2108',
      recommended: true,
    },
    type: 'problem',
    messages: {
      noTemplateLiteralTags:
        'Do not use a template literal tag such as "{{ tag }}" when calling a `i18n` method.',
    },
    fixable: 'code',
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
          if (arg.type === 'TaggedTemplateExpression') {
            context.report({
              node,
              messageId: 'noTemplateLiteralTags',
              data: {
                tag: arg.tag.name,
              },
              fix: (fixer) => {
                return fixer.remove(arg.tag);
              },
            });
          }
        });
      },
    };
  },
};
