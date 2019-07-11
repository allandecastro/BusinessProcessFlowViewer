'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = isolation;

var _arrayReduce = require('../utils/arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addIsolation(style) {
  var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (style.isolation === false) {
    // remove the isolation prop to
    // prevent false CSS properties
    delete style.isolation;
    return style;
  }

  var excludedDeclarations = (0, _arrayReduce2.default)(exclude, function (exclusion, property) {
    exclusion[property] = 'inherit';
    return exclusion;
  }, {});

  return _extends({
    all: 'initial'
  }, excludedDeclarations, style);
}

function isolation() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (style) {
    return addIsolation(style, options.exclude);
  };
}
module.exports = exports['default'];