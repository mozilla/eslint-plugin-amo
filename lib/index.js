'use strict';

const requireIndex = require('requireindex');

// import all rules in lib/rules
const allRules = requireIndex(__dirname + '/rules');
const ruleIds = Object.keys(allRules);

module.exports.rules = allRules;

const recommended = {
  plugins: ['amo'],
  rules: ruleIds
    .filter(
      (ruleId) =>
        allRules[ruleId].meta.docs.recommended &&
        !allRules[ruleId].meta.docs.typescript
    )
    .reduce((acc, ruleId) => {
      return Object.assign({}, acc, {
        [`amo/${ruleId}`]: 2,
      });
    }, {}),
};

const typescript = {
  ...recommended,
  rules: ruleIds
    .filter(
      (ruleId) =>
        allRules[ruleId].meta.docs.recommended &&
        allRules[ruleId].meta.docs.typescript
    )
    .reduce((acc, ruleId) => {
      return Object.assign({}, acc, {
        [`amo/${ruleId}`]: 2,
      });
    }, {}),
};

// Configuration variants.
module.exports.configs = {
  recommended,
  typescript,
};
