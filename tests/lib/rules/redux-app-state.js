'use strict';

const rule = require('../../../lib/rules/redux-app-state');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const invalidExample = (code) => ({
  code,
  errors: [
    {
      messageId: 'invalidStateType',
    },
  ],
});

ruleTester.run('redux-app-state', rule, {
  valid: [
    'const mapStateToProps = (state: AppState) => {}',
    'function mapStateToProps(state: AppState) {}',
    'function mapStateToProps() {}',
    'function mapStateToProps(state) {}',
    'function Component(props: Props) {}',
    'const Component = (props: Props) => {}',
    'const fn = (foo: string) => {}',
  ],
  invalid: [
    invalidExample('const mapStateToProps = (state: Object) => {}'),
    invalidExample('const mapStateToProps = (state: {| foo: Object |}) => {}'),
    invalidExample('function mapStateToProps(state: Object) {}'),
  ],
});
