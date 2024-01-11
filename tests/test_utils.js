const assert = require('assert');

const { getI18nValidCases, getI18nInvalidCases } = require('./utils');

const methods = [
  ['gettext', [0]],
  ['dgettext', [1]],
  ['dcgettext', [2, 3]],
];

describe('utils', () => {
  it('creates valid tests for all i18n methods', () => {
    const tests = getI18nValidCases(methods, ['"hello"']);

    assert.deepEqual(tests, [
      {
        code: 'i18n.gettext("hello")',
      },
      {
        code: `i18n.dgettext('static', "hello")`,
      },
      {
        code: `i18n.dcgettext('static', 'static', "hello", "hello")`,
      },
    ]);
  });

  it('creates invalid tests for all i18n methods', () => {
    const tests = getI18nInvalidCases(methods, [
      {
        input: '`hello`',
        errors: [{ messageId: 'noDynamicValue' }],
      },
    ]);

    assert.deepEqual(tests, [
      {
        code: 'i18n.gettext(`hello`)',
        errors: [
          {
            messageId: 'noDynamicValue',
          },
        ],
      },
      {
        code: "i18n.dgettext('static', `hello`)",
        errors: [
          {
            messageId: 'noDynamicValue',
          },
        ],
      },
      {
        code: "i18n.dcgettext('static', 'static', `hello`, `hello`)",
        errors: [
          {
            messageId: 'noDynamicValue',
          },
          {
            messageId: 'noDynamicValue',
          },
        ],
      },
    ]);
  });

  it('creates invalid tests with output', () => {
    const tests = getI18nInvalidCases(
      [['gettext', [0]]],
      [
        {
          input: '`hello`',
          errors: [{ messageId: 'noDynamicValue' }],
          output: "'hello'",
        },
      ]
    );

    assert.deepEqual(tests, [
      {
        code: 'i18n.gettext(`hello`)',
        errors: [
          {
            messageId: 'noDynamicValue',
          },
        ],
        output: "i18n.gettext('hello')",
      },
    ]);
  });
});
