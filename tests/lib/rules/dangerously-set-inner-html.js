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

const examples = {
  valid: [
    '<div dangerouslySetInnerHTML={sanitizeUserHTML(content)} />',
    '<div dangerouslySetInnerHTML={{__html: "some html"}} />',
    '<div foo="bar" />',
    '<div />',
  ],

  invalid: [
    invalidExample(
      '<p dangerouslySetInnerHTML={sanitizeUserHTML(content)} />',
      'p'
    ),
  ],
};

ruleTester.run('dangerously-set-inner-html', rule, examples);

module.exports = { examples };
