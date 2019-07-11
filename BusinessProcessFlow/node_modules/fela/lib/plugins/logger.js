'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function addLogger(style, type) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(type, _extends({}, style));
  }

  return style;
}
/* eslint-disable no-console */

exports.default = function () {
  return addLogger;
};

module.exports = exports['default'];