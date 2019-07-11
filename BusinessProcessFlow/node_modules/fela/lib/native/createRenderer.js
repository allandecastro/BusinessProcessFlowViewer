'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRenderer;

var _reactNative = require('react-native');

var _processStyleWithPlugins = require('../utils/processStyleWithPlugins');

var _processStyleWithPlugins2 = _interopRequireDefault(_processStyleWithPlugins);

var _arrayEach = require('../utils/arrayEach');

var _arrayEach2 = _interopRequireDefault(_arrayEach);

var _styleTypes = require('../utils/styleTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved, import/extensions */
function createRenderer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var renderer = {
    listeners: [],
    plugins: config.plugins || [],
    isNativeRenderer: true,

    clear: function clear() {
      renderer.cache = {};
      renderer.ids = [];
    },
    renderRule: function renderRule(rule) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var style = rule(props);
      var reference = JSON.stringify(style);

      if (!renderer.cache.hasOwnProperty(reference)) {
        var processedStyle = (0, _processStyleWithPlugins2.default)(renderer.plugins, style, _styleTypes.RULE_TYPE);
        renderer.cache[reference] = _reactNative.StyleSheet.create({ style: processedStyle });
      }

      return renderer.cache[reference].style;
    }
  };

  // initial setup
  renderer.clear();

  if (config.enhancers) {
    (0, _arrayEach2.default)(config.enhancers, function (enhancer) {
      renderer = enhancer(renderer);
    });
  }

  return renderer;
}
module.exports = exports['default'];