'use strict';

const rule = require('../../../lib/rules/with-router-hoc-first');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
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
    // Important: the first code snippet in this list will be used to generate
    // documentation. Make sure to format it properly with `\n` and indentation.
    'compose(\n  withRouter,\n  connect(mapStateToProps)\n)(MyComponent)',
    'withRouter(connect(mapStateToProps)(MyComponent))',
    'compose(withRouter)(MyComponent)',
    'withRouter(MyComponent)',
    'translate(MyComponent)',
    'compose(translate(), foo())(MyComponent)',
  ],

  invalid: [
    // Important: the first code snippet in this list will be used to generate
    // documentation. Make sure to format it properly with `\n` and indentation.
    // In addition, always use the `invalidExample()` helper.
    invalidExample(
      'compose(\n  connect(mapStateToProps),\n  withRouter\n)(MyComponent)'
    ),
    invalidExample('connect(mapStateToProps)(withRouter(MyComponent))'),
    invalidExample('translate()(withRouter(MyComponent))'),
  ],
};

ruleTester.run('with-router-hoc-first', rule, examples);

module.exports = { examples };
