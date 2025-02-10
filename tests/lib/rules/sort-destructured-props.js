'use strict';

const rule = require('../../../lib/rules/sort-destructured-props');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2018,
    },
  },
});

const invalidExample = (code, output) => ({
  code,
  errors: [
    {
      messageId: 'error',
    },
  ],
  output,
});

const examples = {
  valid: [
    'const { Component, _c, a, b, ...otherProps } = this.props;',
    'const { Component, a } = this.props;',
    'const {\n  Component,\n  _c,\n  a,\n  b,\n  ...others\n} = this.props;',
    'const { a: newA, b } = this.props;',
    `const foo = ({ _default = '1', a }) => {};`,
    `const foo = ({ a, store = createStore() }) => {};`,
  ],

  invalid: [
    invalidExample(
      'const { a, _c, b, Component, ...otherProps } = this.props;',
      'const { Component, _c, a, b, ...otherProps } = this.props;'
    ),
    invalidExample(
      'const { b, a, _c, _a, _b, d } = this.props;',
      'const { _a, _b, _c, a, b, d } = this.props;'
    ),
    invalidExample(
      'const { a, b, Component } = this.props;',
      'const { Component, a, b } = this.props;'
    ),
    invalidExample(
      'const {\n  a,\n  b,\n  _c,\n  Component,\n  ...others\n} = this.props;',
      'const {\n  Component,\n  _c,\n  a,\n  b,\n  ...others\n} = this.props;'
    ),
    invalidExample(
      'const { b, a: newA } = this.props;',
      'const { a: newA, b } = this.props;'
    ),
    invalidExample(
      `const foo = ({ a, _default = '1' }) => {};`,
      `const foo = ({ _default = '1', a }) => {};`
    ),
    invalidExample(
      `const foo = ({ store = createStore(), a }) => {};`,
      `const foo = ({ a, store = createStore() }) => {};`
    ),
    invalidExample(
      `const foo = ({ match = { params }, a } = {}) => {};`,
      `const foo = ({ a, match = { params } } = {}) => {};`
    ),
    invalidExample(
      'const { foo: { params }, bar } = props;',
      'const { bar, foo: { params } } = props;'
    ),
  ],
};

ruleTester.run('sort-destructured-props', rule, examples);

module.exports = { examples };
