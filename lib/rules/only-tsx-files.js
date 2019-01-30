'use strict';

module.exports = {
  meta: {
    docs: {
      category: 'TypeScript',
      description: 'Enforce `.tsx` file extensions',
      githubIssue: 'https://github.com/mozilla/addons-code-manager/issues/75',
      recommended: true,
      typescript: true,
    },
    messages: {
      error: 'Only use `.tsx` file extensions in a TypeScript project.',
    },
    fixable: null,
    schema: [],
  },

  create: (context) => {
    return {
      Program: (node) => {
        const name = context.getFilename();

        if (!/\.tsx$/.test(name)) {
          context.report({
            node,
            messageId: 'error',
          });
        }
      },
    };
  },
};
