'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = namedMediaQuery;

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveNamedMediaQuery(style, mediaQueryMap) {
  for (var property in style) {
    var value = style[property];

    if ((0, _isObject2.default)(value)) {
      var resolvedValue = resolveNamedMediaQuery(value, mediaQueryMap);

      if (mediaQueryMap.hasOwnProperty(property)) {
        style[mediaQueryMap[property]] = resolvedValue;
        delete style[property];
      }
    }
  }

  return style;
}
function namedMediaQuery(mediaQueryMap) {
  return function (style) {
    return resolveNamedMediaQuery(style, mediaQueryMap);
  };
}
module.exports = exports['default'];