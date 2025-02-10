'use strict';

const rule = require('../../../lib/rules/i18n-no-reference');
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

const methods = Object.entries(I18N_METHODS).filter(
  ([method]) => !method.includes('ngettext')
);

const invalidNoRefInputs = [
  'foo',
  'foo.bar',
  'this.props.foo',
  'foo()',
  'window.foo',
  'undefined',
  'null',
];

const examples = {
  valid: [
    "i18n.gettext('hallo')",
    ...getI18nValidCases(methods, [
      "'hello'",
      '"hello"',
      '"${hello}"',
      "i18n.gettext('foo')",
    ]),
  ],
  invalid: [
    {
      code: 'i18n.gettext(hello)',
      errors: [
        {
          messageId: 'noDynamicValue',
          // ensures the source code is passed to the reporter
          data: { arg: 'hello', method: 'gettext' },
        },
      ],
    },
    ...getI18nInvalidCases(
      methods,
      invalidNoRefInputs.map((input) => ({
        input,
        errors: [{ messageId: 'noDynamicValue' }],
      }))
    ),
  ],
};

ruleTester.run('i18n-no-reference', rule, examples);

module.exports = { examples };
