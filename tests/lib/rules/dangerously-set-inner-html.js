'use strict';

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
  errors: [
    {
      messageId: 'invalidElementForSanitizeUserHTML',
      data: {
        element,
      },
    },
  ],
});

ruleTester.run('dangerously-set-inner-html', rule, {
  valid: [
    '<div />',
    '<div dangerouslySetInnerHTML={sanitizeUserHTML(content)} />',
    '<div dangerouslySetInnerHTML={{__html: "some html"}} />',
    '<div foo="bar" />',
  ],

  invalid: [
    invalidExample(
      '<p dangerouslySetInnerHTML={sanitizeUserHTML(content)} />',
      'p'
    ),
  ],
});
