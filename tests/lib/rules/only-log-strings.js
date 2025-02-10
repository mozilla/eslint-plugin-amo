'use strict';

const rule = require('../../../lib/rules/only-log-strings');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 6,
    },
  },
});

const invalidExample = (code, options = []) => ({
  code,
  errors: [
    {
      messageId: 'error',
    },
  ],
  options,
});

const examples = {
  valid: [
    // Important: the first code snippet in this list will be used to generate
    // documentation. Make sure to format it properly with `\n` and indentation.
    'log.info("this is a log message");\nlog.debug(oneLine`A very long string message`);\n_log.warn(`request ID: ${requestId}`);',
    '_log.info("this is a log message");',
    'this.props.log.info("this is a log message");',
    'props.log.info("this is a log message");',
    'log.debug("this is a log message");',
    'log.warn("this is a log message");',
    'log.fatal("this is a log message");',
    'log.error("this is a log message");',
    'log.info();',
    'log.info(`This is allowed: ${request.url}`);',
    'props.log.debug(oneLine`This is allowed: ${request.url}`);',
    'stderr.debug(oneLine(`foo = ${foo} and bar = ${bar}`))',
  ],

  invalid: [
    // Important: the first code snippet in this list will be used to generate
    // documentation. Make sure to format it properly with `\n` and indentation.
    // In addition, always use the `invalidExample()` helper.
    invalidExample('log.info("response:", response);'),
    invalidExample('log.debug("params:", { some, params });'),
    invalidExample('this.props._log.warn({ some, params });'),
    invalidExample('props.log.error({ some, params });'),
    invalidExample('this._log.fatal({ some, params }, "in method XYZ");'),
    invalidExample('log.warn(`This is not allowed:`, response)'),
    invalidExample('_log.warn(oneLine`This is not allowed:`, response)'),
    invalidExample('log.foo({ response })', [{ methods: ['foo'] }]),
    invalidExample('foo.info({ response })', [{ objects: ['foo'] }]),
  ],
};

ruleTester.run('only-log-strings', rule, examples);

module.exports = { examples };
