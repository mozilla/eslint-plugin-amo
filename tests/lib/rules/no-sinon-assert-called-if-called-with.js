'use strict';

const rule = require('../../../lib/rules/no-sinon-assert-called-if-called-with');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
    },
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
    "it('description', () => {\n  sinon.assert.calledWith(stub, params);\n});",
    "it('description', () => { sinon.assert.called(stub); }); it('description', () => { sinon.assert.calledWith(stub, params); });",
    "it('description', () => { sinon.assert.called(foo); sinon.assert.calledWith(bar, params); });",
    "it('description', () => { sinon.assert.called(foo.aSpy); sinon.assert.calledWith(foo.anotherSpy, params); });",
  ],

  invalid: [
    invalidExample(
      "it('description', () => {\n  sinon.assert.called(stub);\n  sinon.assert.calledWith(stub, params);\n});"
    ),
    invalidExample(
      "it('description', () => { sinon.assert.called(); sinon.assert.calledWith(); });"
    ),
  ],
};

ruleTester.run('no-sinon-assert-called-if-called-with', rule, examples);

module.exports = { examples };
