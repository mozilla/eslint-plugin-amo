'use strict';

const rule = require('../../../lib/rules/i18n-no-tagged-templates');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const examples = {
  valid: [
    "i18n.gettext('hello');",
    'i18n.gettext(`hello`)',
    'i18n.gettext(`hello\n\nworld`)',
    'i18n.dgettext(tag`domain`, `some content`)',
    "i18n.ngettext('singular', `plural`)",
    '<p>{i18n.gettext(`plural`)}</p>',
    "i18n._('hello');",
  ],
  invalid: [
    {
      code: 'i18n.gettext(tag`translated string`)',
      errors: [{ messageId: 'noTemplateLiteralTags', data: { tag: 'tag' } }],
      output: 'i18n.gettext(`translated string`)',
    },
    {
      code: 'i18n._(tag`translated string`)',
      errors: [{ messageId: 'noTemplateLiteralTags', data: { tag: 'tag' } }],
      output: 'i18n._(`translated string`)',
    },
    ...['dgettext', 'dcgettext'].map((method) => ({
      code: `i18n.${method}('domain', tag\`translated string\`)`,
      errors: [{ messageId: 'noTemplateLiteralTags', data: { tag: 'tag' } }],
      output: `i18n.${method}('domain', \`translated string\`)`,
    })),
    {
      code: '<p>{i18n.gettext(tag`translated string`)}</p>',
      errors: [{ messageId: 'noTemplateLiteralTags', data: { tag: 'tag' } }],
      output: '<p>{i18n.gettext(`translated string`)}</p>',
    },
    // test with multiple tags
    {
      code: "i18n.dngettext('domain', someTag`singular`, someTag`plural`)",
      errors: [
        { messageId: 'noTemplateLiteralTags', data: { tag: 'someTag' } },
        { messageId: 'noTemplateLiteralTags', data: { tag: 'someTag' } },
      ],
      output: "i18n.dngettext('domain', `singular`, `plural`)",
    },
    // test with `--fix`
    {
      code: '<p>{i18n.gettext(tagToRemove`translated string`)}</p>',
      errors: [
        { messageId: 'noTemplateLiteralTags', data: { tag: 'tagToRemove' } },
      ],
      output: '<p>{i18n.gettext(`translated string`)}</p>',
    },
    // test with `--fix` and multiple tags
    {
      code: '<p>{i18n.ngettext(t1`singular`, t2`plural`)}</p>',
      errors: [
        { messageId: 'noTemplateLiteralTags', data: { tag: 't1' } },
        { messageId: 'noTemplateLiteralTags', data: { tag: 't2' } },
      ],
      output: '<p>{i18n.ngettext(`singular`, `plural`)}</p>',
    },
  ],
};

ruleTester.run('i18n-no-tagged-templates', rule, examples);

module.exports = { examples };
