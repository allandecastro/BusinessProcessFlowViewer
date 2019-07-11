'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DOMNode;
function DOMNode() {
  var cssRules = [];

  return {
    textContent: '',
    nodeType: 1,
    nodeName: 'STYLE',
    hasAttribute: function hasAttribute(attribute) {
      return this.hasOwnProperty(attribute);
    },
    setAttribute: function setAttribute(attribute, value) {
      this[attribute] = value;
    },

    sheet: {
      cssRules: cssRules,
      insertRule: function insertRule(rule, id) {
        return cssRules.splice(id, 0, rule);
      }
    }
  };
}
module.exports = exports['default'];