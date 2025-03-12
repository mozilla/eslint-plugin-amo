import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
  { files: ['tests/**/*.js'], languageOptions: { globals: globals.mocha } },
];
