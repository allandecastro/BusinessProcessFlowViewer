'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('../plugins/extend');

var _extend2 = _interopRequireDefault(_extend);

var _prefixer = require('../plugins/prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _fallbackValue = require('../plugins/fallbackValue');

var _fallbackValue2 = _interopRequireDefault(_fallbackValue);

var _LVHA = require('../plugins/LVHA');

var _LVHA2 = _interopRequireDefault(_LVHA);

var _unit = require('../plugins/unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [(0, _extend2.default)(), (0, _prefixer2.default)(), (0, _fallbackValue2.default)(), (0, _LVHA2.default)(), (0, _unit2.default)()]; /*  weak */

module.exports = exports['default'];