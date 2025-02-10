'use strict';

const rule = require('../../../lib/rules/i18n-no-template-literal');
const RuleTester = require('eslint').RuleTester;

const { I18N_METHODS } = require('../../../lib/i18n');
const { getI18nValidCases, getI18nInvalidCases } = require('../../utils');

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const methods = Object.entries(I18N_METHODS);

const examples = {
  valid: [
    "i18n.gettext('hallo')",
    ...getI18nValidCases(methods, ["'hello'", '"hello"', '"${hello}"']),
  ],
  invalid: [
    {
      code: 'i18n.gettext(`\n\nhello`)',
      errors: [
        {
          messageId: 'noStaticTemplate',
          // ensure the method and position are passed to the reporter
          data: { method: 'gettext', position: 0 },
        },
      ],
      output: "i18n.gettext('hello')",
    },
    ...getI18nInvalidCases(methods, [
      {
        input: '`hello`',
        errors: [{ messageId: 'noStaticTemplate' }],
        output: "'hello'",
      },
      {
        input: `\`This add-on is not compatible with your
        version of Firefox.\``,
        errors: [{ messageId: 'noStaticTemplate' }],
        output: "'This add-on is not compatible with your version of Firefox.'",
      },
      {
        input: '`hello ${world}`',
        errors: [{ messageId: 'noStaticTemplate' }],
      },
      {
        input: '`hello\n\nworld`',
        errors: [{ messageId: 'noStaticTemplate' }],
        output: "'hello world'",
      },
      {
        input: '`hello           `',
        errors: [{ messageId: 'noStaticTemplate' }],
        output: "'hello'",
      },
      {
        input: "`Explore our 'Starter Pack' to get started with extensions`",
        errors: [{ messageId: 'noStaticTemplate' }],
        output: `'Explore our \\'Starter Pack\\' to get started with extensions'`,
      },
      {
        input: '`Explore our "Starter Pack" to get started with extensions`',
        errors: [{ messageId: 'noStaticTemplate' }],
        output: `'Explore our \\"Starter Pack\\" to get started with extensions'`,
      },
    ]),
  ],
};

ruleTester.run('i18n-template-literal', rule, examples);

module.exports = { examples };
