'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = beautifier;

var _cssbeautify = require('cssbeautify');

var _cssbeautify2 = _interopRequireDefault(_cssbeautify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBeautifier(renderer, options) {
  var existingRenderToString = renderer.renderToString.bind(renderer);

  renderer.renderToString = function () {
    var css = existingRenderToString();
    return (0, _cssbeautify2.default)(css, options);
  };

  return renderer;
}

var defaultOptions = {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: false
};

function beautifier() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (renderer) {
    return addBeautifier(renderer, _extends({}, defaultOptions, options));
  };
}
module.exports = exports['default'];