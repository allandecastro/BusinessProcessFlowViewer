'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixer;

var _static = require('inline-style-prefixer/static');

var _static2 = _interopRequireDefault(_static);

var _cssifyObject = require('css-in-js-utils/lib/cssifyObject');

var _cssifyObject2 = _interopRequireDefault(_cssifyObject);

var _fallbackValue = require('./fallbackValue');

var _fallbackValue2 = _interopRequireDefault(_fallbackValue);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _objectReduce = require('../utils/objectReduce');

var _objectReduce2 = _interopRequireDefault(_objectReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resolveFallbackValues = (0, _fallbackValue2.default)();

function addVendorPrefixes(style) {
  return (0, _objectReduce2.default)(style, function (prefixedStyle, value, property) {
    if ((0, _isObject2.default)(value)) {
      prefixedStyle[property] = addVendorPrefixes(value);
    } else {
      var prefixedDeclaration = (0, _static2.default)(_defineProperty({}, property, style[property]));
      var styleKeys = Object.keys(prefixedDeclaration);

      var referenceProperty = styleKeys[0];
      var referenceValue = prefixedDeclaration[referenceProperty];

      if (styleKeys.length === 1) {
        prefixedStyle[referenceProperty] = referenceValue;
      } else {
        delete prefixedDeclaration[referenceProperty];
        var inlinedProperties = (0, _cssifyObject2.default)(resolveFallbackValues(prefixedDeclaration));

        prefixedStyle[referenceProperty] = referenceValue + ';' + inlinedProperties;
      }
    }

    return prefixedStyle;
  }, {});
}

function prefixer() {
  return addVendorPrefixes;
}
module.exports = exports['default'];