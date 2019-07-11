'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resolveArrayValue = require('css-in-js-utils/lib/resolveArrayValue');

var _resolveArrayValue2 = _interopRequireDefault(_resolveArrayValue);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveFallbackValues(style) {
  for (var property in style) {
    var value = style[property];

    if (Array.isArray(value)) {
      style[property] = (0, _resolveArrayValue2.default)(property, value);
    } else if ((0, _isObject2.default)(value)) {
      style[property] = resolveFallbackValues(value);
    }
  }

  return style;
}

exports.default = function () {
  return resolveFallbackValues;
};

module.exports = exports['default'];