'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDOMInterface;

var _styleTypes = require('../utils/styleTypes');

function createDOMInterface(renderer, node) {
  return function (change) {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (process.env.NODE_ENV === 'production' && change.type === _styleTypes.RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(change.selector + '{' + change.declaration + '}', node.sheet.cssRules.length);
      } catch (error) {
        // TODO: MAYBE WARN IN DEV MODE
      }
    } else {
      node.textContent = renderer.renderToString();
    }
  };
} /*  weak */
module.exports = exports['default'];