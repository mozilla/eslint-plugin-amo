'use strict';

const rule = require('../../../lib/rules/one-top-level-describe-per-test');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
    },
  },
});

const invalidExample = (code) => ({
  code,
  errors: [
    {
      messageId: 'error',
    },
  ],
});

const examples = {
  valid: [
    "describe(__filename, () => {\n  describe('foo', () => {});\n  describe('bar', () => {});\n});",
    "describe('foo', () => {});",
    "somethingUnrelated('foo', () => {});",
  ],

  invalid: [
    invalidExample("describe('foo', () => {});\ndescribe('bar', () => {});"),
  ],
};

ruleTester.run('one-top-level-describe-per-test', rule, examples);

module.exports = { examples };
