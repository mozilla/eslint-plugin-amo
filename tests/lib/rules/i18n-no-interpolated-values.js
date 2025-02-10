'use strict';

const rule = require('../../../lib/rules/i18n-no-interpolated-values');
const RuleTester = require('eslint').RuleTester;

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

const examples = {
  valid: [
    'i18n.gettext(`some %(value)s`)',
    'i18n.gettext(`hello`)',
    'i18n.dgettext(`domain`, `some content`)',
    "i18n.ngettext('singular', `plural`)",
    "i18n._('hello');",
    "i18n._('${hello}');",
    "i18n._('{hello}');",
    "i18n.dgettext('domain', `{hello}`);",
    'i18n.dgettext(`${domain}`, `{hello}`);',
  ],
  invalid: [
    {
      code: 'i18n.gettext(`some ${value}`)',
      errors: [{ messageId: 'noInterpolatedValues', data: {} }],
    },
    {
      code: 'i18n._(`some ${value} and some ${otherValue}`)',
      errors: [{ messageId: 'noInterpolatedValues', data: {} }],
    },
    {
      code: 'i18n._(`${value}`)',
      errors: [{ messageId: 'noInterpolatedValues', data: {} }],
    },
  ],
};

ruleTester.run('i18n-no-interpolated-values', rule, examples);

module.exports = { examples };
