'use strict';

const rule = require('../../../lib/rules/redux-app-state');
const babelParser = require('@babel/eslint-parser');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: babelParser,
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        plugins: ['@babel/plugin-syntax-flow'],
      },
    },
  },
});

const invalidExample = (code) => ({
  code,
  errors: [
    {
      messageId: 'invalidStateType',
    },
  ],
});

const examples = {
  valid: [
    'const mapStateToProps = (state: AppState) => {};',
    'function mapStateToProps(state: AppState) {}',
    'function mapStateToProps() {}',
    'function mapStateToProps(state) {}',
    'function Component(props: Props) {}',
    'const Component = (props: Props) => {}',
    'const fn = (foo: string) => {}',
  ],
  invalid: [
    invalidExample('const mapStateToProps = (state: Object) => {};'),
    invalidExample('const mapStateToProps = (state: {| foo: Object |}) => {}'),
    invalidExample('function mapStateToProps(state: Object) {}'),
  ],
};

ruleTester.run('redux-app-state', rule, examples);

module.exports = { examples };
