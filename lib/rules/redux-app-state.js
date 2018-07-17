'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'Flow',
      description:
        'Ensure the `AppState` Flow type is used on `state` arguments',
      githubIssue: 'https://github.com/mozilla/addons-frontend/issues/4058',
      recommended: true,
    },
    messages: {
      invalidStateType: 'Use the `AppState` Flow type on the `state` argument.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const rule = (node) => {
      const { params } = node;

      if (
        !params.length ||
        params[0].name !== 'state' ||
        !params[0].typeAnnotation
      ) {
        return;
      }

      const { typeAnnotation } = params[0].typeAnnotation;

      if (
        typeAnnotation.type === 'ObjectTypeAnnotation' ||
        (typeAnnotation.id && typeAnnotation.id.name !== 'AppState')
      ) {
        context.report({ node, messageId: 'invalidStateType' });
      }
    };

    return {
      ArrowFunctionExpression: rule,
      FunctionDeclaration: rule,
    };
  },
};
