'use strict';

const rule = require('../../../lib/rules/describe-with-filename');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

const invalidExample = (code, element) => ({
  code,
  errors: [
    {
      messageId: 'invalidDescription',
    },
  ],
});

ruleTester.run('describe-with-filename', rule, {
  valid: [
    'describe(__filename, () => {});',
    "describe(__filename, () => { describe('foo', () => {}); });",
  ],

  invalid: [
    invalidExample("describe('foo', () => {});"),
    invalidExample("describe('foo', () => { describe('bar', () => {}); });"),
    // tests with `--fix`
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
});
