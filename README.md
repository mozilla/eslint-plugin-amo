# eslint-plugin-amo

[![Build
Status](https://travis-ci.org/willdurand/eslint-plugin-amo.svg?branch=master)](https://travis-ci.org/willdurand/eslint-plugin-amo)

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

### `dangerously-set-inner-html`

Ensure `dangerouslySetInnerHTML` is used on elements that permit flow content:

```js
// BAD
<p dangerouslySetInnerHTML={sanitizeUserHTML(content)} />

// GOOD
<div dangerouslySetInnerHTML={sanitizeUserHTML(content)} />
```

### `describe-with-filename`

Ensure the top-level `describe` block has `__filename` as description in a test file:

```js
// BAD
describe('<Component />', () => {
  // ...
});

// GOOD
describe(__filename, () => {
  // ...
});
```

This rule is _fixable_ (it changes the description when using `eslint --fix`).

### `i18n-no-tagged-templates`

Ensure no template literal tags are passed to i18n methods:

```js
// BAD
i18n.gettext(oneLine`Hello,
world`);

// GOOD
i18n.gettext(`Hello,
world`);
```

This rule is _fixable_ (it removes the tag when using `eslint --fix`).

### `redux-app-state`

Ensure the `AppState` Flow type is used on `state` arguments:

```js
// BAD
const mapStateToProps = (state: {| user: UserState |}) => {};

// GOOD
const mapStateToProps = (state: AppState) => {};
```

## Contributing

Install the project dependencies:

```
npm install
```

Run the test suite:

```
npm test
```

New rules can be added with the [ESLint generator for Yeoman](https://github.com/eslint/generator-eslint):

```
yo eslint:rule
```

Note: we do not use the generated documentation files.

For further information, please see the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## License

eslint-plugin-amo is released under the Mozilla Public License Version 2.0. See the bundled [LICENSE](./LICENSE.txt) file for details.
