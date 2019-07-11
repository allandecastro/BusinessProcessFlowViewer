'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable consistent-return, no-console */


exports.default = logger;

var _cssbeautify = require('cssbeautify');

var _cssbeautify2 = _interopRequireDefault(_cssbeautify);

var _styleTypes = require('../utils/styleTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addLogger(renderer, options) {
  renderer.subscribe(function (change) {
    if (change.type === _styleTypes.CLEAR_TYPE) {
      console.log('Cleared renderer cache.');
      return true;
    }

    var selector = change.selector || change.fontFamily || change.name;
    var css = change.declaration || change.keyframe || change.fontFace || change.css;
    var formattedCSS = options.format ? (0, _cssbeautify2.default)(css) : css;
    var isMedia = change.media && change.media.length > 0;

    // logs all information in a group
    console.group(selector);
    if (isMedia) {
      console.log(change.media);
    }
    if (options.logCSS) {
      console.log(formattedCSS);
    }
    console.groupEnd(selector);
  });

  return renderer;
}

var defaultOptions = {
  logCSS: false,
  formatCSS: false
};

function logger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (renderer) {
    return addLogger(renderer, _extends({}, defaultOptions, options));
  };
}
module.exports = exports['default'];