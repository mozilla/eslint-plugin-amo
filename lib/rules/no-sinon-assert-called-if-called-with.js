'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description:
        'Ensure `sinon.assert.called()` is absent when `sinon.assert.calledWith()` is used',
      githubIssue: 'https://github.com/mozilla/addons-frontend/issues/2437',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      error:
        'No need to use `sinon.assert.called()` when you use `sinon.assert.calledWith()` on the same spy.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const isSinonAssertCall = (node) => {
      if (!node.expression.callee) {
        return false;
      }

      const { object } = node.expression.callee;

      if (!object || !object.object || !object.property) {
        return false;
      }

      return (
        object.object.name === 'sinon' && object.property.name === 'assert'
      );
    };

    const getSinonAssertMethod = (node) => {
      return node.expression.callee.property.name;
    };

    const getSinonAssertSpy = (node) => {
      if (!node.expression.arguments.length) {
        return null;
      }

      const spy = node.expression.arguments[0];

      if (spy.type === 'MemberExpression') {
        return `${spy.object.name}.${spy.property.name}`;
      }

      return spy.name;
    };

    return {
      BlockStatement: (node) => {
        const { body } = node;

        for (let i = 0; i < body.length; i++) {
          const current = body[i];
          const next = i + 1 < body.length ? body[i + 1] : null;

          if (
            !current ||
            !next ||
            current.type !== 'ExpressionStatement' ||
            next.type !== 'ExpressionStatement' ||
            !isSinonAssertCall(current) ||
            !isSinonAssertCall(next)
          ) {
            continue;
          }

          if (
            getSinonAssertMethod(current) === 'called' &&
            getSinonAssertMethod(next) === 'calledWith' &&
            getSinonAssertSpy(current) === getSinonAssertSpy(next)
          ) {
            context.report({
              node: current,
              messageId: 'error',
            });

            break;
          }
        }
      },
    };
  },
};
