'use strict';

const I18N_METHODS = {
  gettext: [0],
  dgettext: [1],
  dcgettext: [1],
  ngettext: [0, 1],
  dngettext: [1, 2],
  dcngettext: [1, 2],
  pgettext: [1],
  dpgettext: [2],
  dcpgettext: [2],
  npgettext: [1, 2],
  dnpgettext: [2, 3],
  dcnpgettext: [2, 3],
  // This is used in https://github.com/mozilla/addons-linter.
  _: [0],
};

module.exports = { I18N_METHODS };
