'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assignStyle = require('css-in-js-utils/lib/assignStyle');

var _assignStyle2 = _interopRequireDefault(_assignStyle);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _arrayEach = require('../utils/arrayEach');

var _arrayEach2 = _interopRequireDefault(_arrayEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendStyle(style, extension, extendPlugin) {
  // extend conditional style objects
  if (extension.hasOwnProperty('condition')) {
    if (extension.condition) {
      (0, _assignStyle2.default)(style, extendPlugin(extension.style));
    }
  } else {
    // extend basic style objects
    (0, _assignStyle2.default)(style, extension);
  }
}


function extend(style) {
  for (var property in style) {
    var value = style[property];

    if (property === 'extend') {
      var extensions = [].concat(value);

      (0, _arrayEach2.default)(extensions, function (extension) {
        return extendStyle(style, extension, extend);
      });
      delete style[property];
    } else if ((0, _isObject2.default)(value)) {
      // support nested extend as well
      style[property] = extend(value);
    }
  }

  return style;
}

exports.default = function () {
  return extend;
};

module.exports = exports['default'];