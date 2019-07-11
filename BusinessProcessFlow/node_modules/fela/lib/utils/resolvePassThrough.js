'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolvePassThrough;
function resolvePassThrough(passThrough, ruleProps) {
  if (typeof passThrough === 'function') {
    return Object.keys(passThrough(ruleProps));
  }

  return passThrough;
}
module.exports = exports['default'];