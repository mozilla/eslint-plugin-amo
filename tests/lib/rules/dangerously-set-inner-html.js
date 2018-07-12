"use strict";

const rule = require('../../../lib/rules/dangerously-set-inner-html');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const invalidExample = (code, element) => ({
  code,
  errors: [{
    messageId: 'invalidElement',
    data: {
      element,
    },
  }],
});

ruleTester.run('dangerously-set-inner-html', rule, {
  valid: [
    '<div dangerouslySetInnerHTML={{__html: "some html"}} />',
    '<style dangerouslySetInnerHTML={{__html: "some style"}} />',
  ],

  invalid: [
    invalidExample('<p dangerouslySetInnerHTML={{__html: "some html"}} />', 'p'),
  ]
});
