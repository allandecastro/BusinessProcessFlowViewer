'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefinedValue = require('../utils/isUndefinedValue');

var _isUndefinedValue2 = _interopRequireDefault(_isUndefinedValue);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeUndefined(style) {
  for (var property in style) {
    var value = style[property];

    if ((0, _isObject2.default)(value)) {
      style[property] = removeUndefined(value);
    } else if (Array.isArray(value)) {
      style[property] = value.filter(function (val) {
        return !(0, _isUndefinedValue2.default)(val);
      });
    } else if ((0, _isUndefinedValue2.default)(value)) {
      delete style[property];
    }
  }

  return style;
}

exports.default = function () {
  return removeUndefined;
};

module.exports = exports['default'];