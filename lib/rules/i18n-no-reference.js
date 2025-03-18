'use strict';

const { I18N_METHODS } = require('../i18n.js');

const isReferenceNode = (node) => {
  if (node.type === 'TemplateLiteral') {
    return false;
  }

  return node.type !== 'Literal' || typeof node.value !== 'string';
};

const extractI18nMethodAndArgs = (node) => {
  let result = [];

  if (node.type === 'CallExpression') {
    const { callee } = node;
    if (callee.type === 'MemberExpression') {
      const { object, property } = callee;
      if (object.name === 'i18n') {
        result = [property.name, node.arguments];
      }
    }
  }

  return result;
};

module.exports = {
  meta: {
    docs: {
      githubIssue: 'https://github.com/mozilla/eslint-plugin-amo/issues/232',
      category: 'Possible Errors',
      description:
        'Ensure predictable static values are passed as i18n method arguments',
    },
    type: 'problem',
    fixable: null,
    schema: [],
    messages: {
      noDynamicValue:
        'invalid argument type "{{ arg }}" passed to i18n.{{ method }}(). Only static values or calls to i18n methods are allowed.',
    },
  },

  create(context) {
    const SOURCE_CODE = context.sourceCode ?? context.getSourceCode();

    return {
      CallExpression(node) {
        const [methodName, methodArgs] = extractI18nMethodAndArgs(node);

        if (!methodName || !methodArgs || methodName.includes('ngettext')) {
          return;
        }

        const positions = I18N_METHODS[methodName] || [];

        positions.forEach((position) => {
          const arg = methodArgs[position];

          const [argMethod] = extractI18nMethodAndArgs(arg);

          if (isReferenceNode(arg) && !argMethod) {
            context.report({
              node,
              messageId: 'noDynamicValue',
              data: {
                method: methodName,
                arg: SOURCE_CODE.getText(arg),
              },
            });
          }
        });
      },
    };
  },
};
