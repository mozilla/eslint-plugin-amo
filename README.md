# eslint-plugin-amo

[![Build
Status](https://travis-ci.org/mozilla/eslint-plugin-amo.svg?branch=master)](https://travis-ci.org/mozilla/eslint-plugin-amo) [![npm version](https://badge.fury.io/js/eslint-plugin-amo.svg)](https://badge.fury.io/js/eslint-plugin-amo)

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

## Rules

<!-- THIS SECTION IS AUTOMATICALLY GENERATED, PLEASE RUN: `npm run build-doc` -->

<!--DOC_START-->

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

Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/2928.

### `i18n-no-tagged-templates`

Ensure no template literal tags are passed to i18n methods:

```js
// BAD
i18n.gettext(tag`translated string`);

// GOOD
i18n.gettext('hello');
```

Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

:bulb: We enforce this rule because of the following issue: https://github.com/mozilla/addons-frontend/issues/2108.

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

Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

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

Use the ESLint `--fix` option on the command line to automatically fixes problems reported by this rule.

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
