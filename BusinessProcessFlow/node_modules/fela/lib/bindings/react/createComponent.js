'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createComponentFactory = require('../createComponentFactory');

var _createComponentFactory2 = _interopRequireDefault(_createComponentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createComponentFactory2.default)(_react.createElement, {
  renderer: _propTypes2.default.object,
  theme: _propTypes2.default.object
});
module.exports = exports['default'];