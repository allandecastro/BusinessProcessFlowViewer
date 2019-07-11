'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _infernoComponent = require('inferno-component');

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

var _infernoCreateElement = require('inferno-create-element');

var _infernoCreateElement2 = _interopRequireDefault(_infernoCreateElement);

var _connectFactory = require('../connectFactory');

var _connectFactory2 = _interopRequireDefault(_connectFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _connectFactory2.default)(_infernoComponent2.default, _infernoCreateElement2.default);
module.exports = exports['default'];