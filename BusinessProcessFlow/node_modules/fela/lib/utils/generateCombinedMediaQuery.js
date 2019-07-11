"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateCombinedMediaQuery;
function generateCombinedMediaQuery(currentMediaQuery, nestedMediaQuery) {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }

  return currentMediaQuery + " and " + nestedMediaQuery;
}
module.exports = exports["default"];