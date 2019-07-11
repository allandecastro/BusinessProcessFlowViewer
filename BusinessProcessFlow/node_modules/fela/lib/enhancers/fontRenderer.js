'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fontRenderer;

var _createRenderer = require('../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

var _render = require('../dom/render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addFontRenderer(renderer, mountNode) {
  renderer.fontRenderer = (0, _createRenderer2.default)();

  // mount font styles into the mountNode
  if (mountNode) {
    (0, _render2.default)(renderer.fontRenderer, mountNode);
  }

  renderer.renderFont = function (family, files, properties) {
    return renderer.fontRenderer.renderFont(family, files, properties);
  };

  return renderer;
}

function fontRenderer(mountNode) {
  return function (renderer) {
    return addFontRenderer(renderer, mountNode);
  };
}
module.exports = exports['default'];