'use strict';

const rule = require('../../../lib/rules/one-top-level-describe-per-test');
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
      messageId: 'error',
    },
  ],
});

ruleTester.run('one-top-level-describe-per-test', rule, {
  valid: [
    "describe('foo', () => {});",
    "describe('foo', () => { describe('foo 1', () => {}); describe('foo 2', () => {}); });",
    "somethingUnrelated('foo', () => {});",
  ],

  invalid: [
    invalidExample("describe('foo', () => {}); describe('bar', () => {});"),
  ],
});
