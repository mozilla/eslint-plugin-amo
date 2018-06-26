"use strict";

var requireIndex = require("requireindex");

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// Default configuration.
module.exports.configs = {
  recommended: {
    'amo/i18n-no-tagged-templates': 2,
  },
};
