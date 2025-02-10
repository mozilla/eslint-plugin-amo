'use strict';

const rule = require('../../../lib/rules/only-tsx-files');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
    },
  },
});

const invalidExample = (code, filename) => ({
  code,
  filename,
  errors: [
    {
      messageId: 'error',
    },
  ],
});

const examples = {
  valid: [
    {
      code: '// some code',
      filename: 'src/api/index.tsx',
    },
    {
      code: '// some code',
      filename: 'src/Foo.tsx',
    },
    {
      code: '// some code',
      filename: 'src/@types/lib/index.d.ts',
    },
  ],
  invalid: [
    invalidExample('// some code', 'src/api/index.ts'),
    invalidExample('// some code', 'src/Foo.ts'),
  ],
};

ruleTester.run('only-tsx-files', rule, examples);

module.exports = { examples };
