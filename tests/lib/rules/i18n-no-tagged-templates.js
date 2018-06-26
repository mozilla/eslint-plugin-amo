"use strict";

const rule = require("../../../lib/rules/i18n-no-tagged-templates");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const invalidExample = (code) => ({
  code,
  errors: [{
    messageId: 'noTemplateLiteralTags',
    data: {
      tag: 'tag',
    },
  }],
});

ruleTester.run("i18n-no-tagged-templates", rule, {
  valid: [
    "i18n.gettext('hello')",
    'i18n.gettext(`hello`)',
    'i18n.gettext(`hello\n\nworld`)',
    'i18n.dgettext(tag`domain`, `some content`)',
    "i18n.ngettext('singular', `plural`)",
    "<p>{i18n.gettext(`plural`)}</p>",
  ],
  invalid: [
    invalidExample("i18n.gettext(tag`translated string`)"),
    invalidExample("i18n.dgettext('domain', tag`translated string`)"),
    invalidExample("i18n.dcgettext('domain', tag`translated string`)"),
    invalidExample("i18n.dcgettext('domain', tag`translated string`)"),
    invalidExample("i18n.ngettext('singular', tag`plural`)"),
    invalidExample("i18n.dngettext('domain', 'singular', tag`plural`)"),
    invalidExample("i18n.dngettext('domain', tag`singular`, `plural`)"),
    // test with multiple tags
    {
      code: "i18n.dngettext('domain', someTag`singular`, someTag`plural`)",
      errors: [
        { messageId: 'noTemplateLiteralTags', data: { tag: 'someTag' } },
        { messageId: 'noTemplateLiteralTags', data: { tag: 'someTag' } },
      ],
    },
    invalidExample('<p>{i18n.gettext(tag`translated string`)}</p>'),
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
  ]
});
