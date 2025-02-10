# eslint-plugin-amo

[![CircleCI](https://circleci.com/gh/mozilla/eslint-plugin-amo.svg?style=svg)](https://circleci.com/gh/mozilla/eslint-plugin-amo) [![npm version](https://badge.fury.io/js/eslint-plugin-amo.svg)](https://badge.fury.io/js/eslint-plugin-amo)

ESLint plugin for [AMO](https://wiki.mozilla.org/AMO).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-amo`:

```
$ npm install eslint-plugin-amo --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-amo` globally.

## Usage

Add `amo` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["amo"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "amo/rule-name": 2
  }
}
```

Alternatively, you can use the `recommended` preset to get reasonable defaults:

```json
{
  "extends": ["plugin:amo/recommended"]
}
```

### TypeScript

You can use the `typescript` preset to get reasonable defaults (it includes the `recommended` rules) as well as TypeScript specific rules:

```json
{
  "extends": ["plugin:amo/typescript"]
}
```

## Rules

<!-- THIS SECTION IS AUTOMATICALLY GENERATED, PLEASE RUN: `npm run build-doc` -->

<!--DOC_START-->
- [`dangerously-set-inner-html`](#dangerously-set-inner-html)
- [`describe-with-filename`](#describe-with-filename)
- [`i18n-no-interpolated-values`](#i18n-no-interpolated-values)
- [`i18n-no-reference`](#i18n-no-reference)
- [`i18n-no-tagged-templates`](#i18n-no-tagged-templates)
- [`i18n-no-template-literal`](#i18n-no-template-literal)
- [`no-sinon-assert-called-if-called-with`](#no-sinon-assert-called-if-called-with)
- [`one-top-level-describe-per-test`](#one-top-level-describe-per-test)
- [`only-log-strings`](#only-log-strings)
- [`only-tsx-files`](#only-tsx-files)
- [`redux-app-state`](#redux-app-state)
- [`sort-destructured-props`](#sort-destructured-props)
- [`with-router-hoc-first`](#with-router-hoc-first)


### `dangerously-set-inner-html`

Ensure `dangerouslySetInnerHTML` is used on elements that permit flow content:

```js
// BAD
<p dangerouslySetInnerHTML={sanitizeUserHTML(content)} />

// GOOD
<div dangerouslySetInnerHTML={sanitizeUserHTML(content)} />
```

### `describe-with-filename`

Ensure the top-level `describe` block has `__filename` as description:

```js
// BAD
describe('foo', () => {});

// GOOD
describe(__filename, () => {});
```

:wrench: Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/2928.

### `i18n-no-interpolated-values`

Ensure no interpolated values are passed to i18n methods:

```js
// BAD
i18n.gettext(`some ${value}`)

// GOOD
i18n.gettext(`some %(value)s`)
```

### `i18n-no-reference`

Ensure predictable static values are passed as i18n method arguments:

```js
// BAD
i18n.gettext(hello)

// GOOD
i18n.gettext('hallo')
```

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/eslint-plugin-amo/issues/232.

:warning: This rule is not part of the `recommended` preset.

### `i18n-no-tagged-templates`

Ensure no template literal tags are passed to i18n methods:

```js
// BAD
i18n.gettext(tag`translated string`)

// GOOD
i18n.gettext('hello')
```

:wrench: Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/2108.

### `i18n-no-template-literal`

Ensure predictable static values are passed as i18n method arguments:

```js
// BAD
i18n.gettext(`

hello`)

// GOOD
i18n.gettext('hallo')
```

:wrench: Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:warning: This rule is not part of the `recommended` preset.

### `no-sinon-assert-called-if-called-with`

Ensure `sinon.assert.called()` is absent when `sinon.assert.calledWith()` is used:

```js
// BAD
it('description', () => {
  sinon.assert.called(stub);
  sinon.assert.calledWith(stub, params);
});

// GOOD
it('description', () => {
  sinon.assert.calledWith(stub, params);
});
```

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/2437.

### `one-top-level-describe-per-test`

Ensure there is a single top-level `describe` block per test file:

```js
// BAD
describe('foo', () => {});
describe('bar', () => {});

// GOOD
describe(__filename, () => {
  describe('foo', () => {});
  describe('bar', () => {});
});
```

### `only-log-strings`

Ensure we do not log full objects:

```js
// BAD
log.info("response:", response);

// GOOD
log.info("this is a log message");
log.debug(oneLine`A very long string message`);
_log.warn(`request ID: ${requestId}`);
```

:triangular_ruler: This rule can be configured with the following **options**:

| Name      | Type  | Description                                         |
| --------- | ----- | --------------------------------------------------- |
| `methods` | array | A list of logger methods, e.g., `info` or `debug`.  |
| `objects` | array | A list of logger objects, e.g., `log` or `console`. |

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/6512.

### `only-tsx-files`

Enforce `.tsx` file extensions (definition files are ignored by this rule):

- ⛔️ `src/api/index.ts`
- ✅ `src/api/index.tsx`

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-code-manager/issues/75.

### `redux-app-state`

Ensure the `AppState` Flow type is used on `state` arguments:

```js
// BAD
const mapStateToProps = (state: Object) => {};

// GOOD
const mapStateToProps = (state: AppState) => {};
```

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/4058.

### `sort-destructured-props`

Ensure destructured props are sorted:

```js
// BAD
const { a, _c, b, Component, ...otherProps } = this.props;

// GOOD
const { Component, _c, a, b, ...otherProps } = this.props;
```

:wrench: Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:warning: This rule is not part of the `recommended` preset.

### `with-router-hoc-first`

Ensures the `withRouter` HOC is the first in `compose()`:

```js
// BAD
compose(
  connect(mapStateToProps),
  withRouter
)(MyComponent)

// GOOD
compose(
  withRouter,
  connect(mapStateToProps)
)(MyComponent)
```

<!--DOC_END-->

## Contributing

Install the project dependencies:

```
npm install
```

Run the test suite:

```
npm test
```

New rules can be added with the `npm run new-rule` command:

```
npm run new-rule
```

This command will ask a few questions and generate the source and test files.

The "Rules" documentation section is automatically generated with:

```
npm run build-doc
```

For further information, please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

eslint-plugin-amo is released under the Mozilla Public License Version 2.0. See the bundled [LICENSE](./LICENSE.txt) file for details.
