'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = customProperty;

var _assignStyle = require('css-in-js-utils/lib/assignStyle');

var _assignStyle2 = _interopRequireDefault(_assignStyle);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveCustomProperty(style, properties) {
  for (var property in style) {
    var value = style[property];

    if (properties.hasOwnProperty(property)) {
      (0, _assignStyle2.default)(style, properties[property](value));
      delete style[property];
    }

    if ((0, _isObject2.default)(value)) {
      style[property] = resolveCustomProperty(value, properties);
    }
  }

  return style;
}

function customProperty(properties) {
  return function (style) {
    return resolveCustomProperty(style, properties);
  };
}
module.exports = exports['default'];