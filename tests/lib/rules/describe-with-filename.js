'use strict';

const rule = require('../../../lib/rules/describe-with-filename');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
    },
  },
});

const examples = {
  valid: [
    'describe(__filename, () => {});',
    "describe(__filename, () => { describe('foo', () => {}); });",
  ],

  invalid: [
    {
      code: "describe('foo', () => {});",
      errors: [{ messageId: 'invalidDescription' }],
      output: 'describe(__filename, () => {});',
    },
    {
      code: "describe('foo', () => { describe('bar', () => {}); });",
      errors: [{ messageId: 'invalidDescription' }],
      output: "describe(__filename, () => { describe('bar', () => {}); });",
    },
  ],
};

ruleTester.run('describe-with-filename', rule, examples);

module.exports = { examples };
