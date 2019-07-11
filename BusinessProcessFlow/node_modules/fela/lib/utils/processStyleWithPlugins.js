'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processStyleWithPlugins;

var _arrayReduce = require('./arrayReduce');

var _arrayReduce2 = _interopRequireDefault(_arrayReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processStyleWithPlugins(plugins, style, type) {
  if (plugins.length > 0) {
    return (0, _arrayReduce2.default)(plugins, function (processedStyle, plugin) {
      processedStyle = plugin(processedStyle, type);
      return processedStyle;
    }, style);
  }

  return style;
}
module.exports = exports['default'];