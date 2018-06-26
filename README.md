# eslint-plugin-amo

ESLint plugin for AMO.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-amo`:

```
$ npm install eslint-plugin-amo --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must
also install `eslint-plugin-amo` globally.

## Usage

Add `amo` to the plugins section of your `.eslintrc` configuration file. You can
omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "amo"
    ]
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
