'use strict';

const requireIndex = require('requireindex');

// import all rules in lib/rules
const allRules = requireIndex(__dirname + '/rules');
const ruleIds = Object.keys(allRules);

module.exports.rules = allRules;

// Default configuration.
module.exports.configs = {
  recommended: {
    plugins: ['amo'],
    rules: ruleIds
      .filter((ruleId) => allRules[ruleId].meta.docs.recommended)
      .reduce((acc, ruleId) => {
        return Object.assign({}, acc, {
          [`amo/${ruleId}`]: 2,
        });
      }, {}),
  },
};
