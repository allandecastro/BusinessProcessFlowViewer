'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = new RegExp('^on([A-Z])');


function friendlyPseudoClass(style) {
  for (var property in style) {
    var value = style[property];

    if ((0, _isObject2.default)(value)) {
      var resolvedValue = friendlyPseudoClass(value);

      if (regex.test(property)) {
        var pseudo = property.replace(regex, function (match, p1) {
          return ':' + p1.toLowerCase();
        });

        style[pseudo] = resolvedValue;
        delete style[property];
      } else {
        style[property] = resolvedValue;
      }
    }
  }

  return style;
}

exports.default = function () {
  return friendlyPseudoClass;
};

module.exports = exports['default'];