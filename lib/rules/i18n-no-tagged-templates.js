'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Possible Errors',
      description: 'Ensure no template literal tags are passed to i18n methods',
      recommended: true,
    },
    messages: {
      noTemplateLiteralTags:
        'Do not use a template literal tag such as "{{ tag }}" when calling a `i18n` method.',
    },
    fixable: true,
    schema: [],
  },

  create: (context) => {
    const METHODS = {
      gettext: [0],
      dgettext: [1],
      dcgettext: [1],
      ngettext: [0, 1],
      dngettext: [1, 2],
      dcngettext: [1, 2],
      pgettext: [1],
      dpgettext: [2],
      dcpgettext: [2],
      npgettext: [1, 2],
      dnpgettext: [2, 3],
      dcnpgettext: [2, 3],
    };

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

        const positions = METHODS[property.name] || [];

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
