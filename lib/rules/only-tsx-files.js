'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'TypeScript',
      description:
        'Enforce `.tsx` file extensions (definition files are ignored by this rule)',
      githubIssue: 'https://github.com/mozilla/addons-code-manager/issues/75',
      recommended: true,
      typescript: true,
    },
    type: 'problem',
    messages: {
      error: 'Only use `.tsx` file extensions in a TypeScript project.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    const FILENAME = context.filename ?? context.getFilename();

    return {
      Program: (node) => {
        const name = FILENAME;

        if (name.endsWith('.d.ts')) {
          return;
        }

        if (!name.endsWith('.tsx')) {
          context.report({
            node,
            messageId: 'error',
          });
        }
      },
    };
  },
};
