'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = placeholderPrefixer;

var _customProperty = require('./customProperty');

var _customProperty2 = _interopRequireDefault(_customProperty);

var _arrayReduce = require('../utils/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var placeholderPrefixes = ['::-webkit-input-placeholder', '::-moz-placeholder', ':-ms-input-placeholder', ':-moz-placeholder', '::placeholder'];

function placeholderPrefixer() {
  return (0, _customProperty2.default)({
    '::placeholder': function placeholder(value) {
      return (0, _arrayReduce2.default)(placeholderPrefixes, function (style, prefix) {
        style[prefix] = value;
        return style;
      }, {});
    }
  });
}
module.exports = exports['default'];