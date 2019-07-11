'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _DOMInterface = require('./DOMInterface');

var _DOMInterface2 = _interopRequireDefault(_DOMInterface);

var _warning = require('../utils/warning');

var _warning2 = _interopRequireDefault(_warning);

var _isValidHTMLElement = require('../utils/isValidHTMLElement');

var _isValidHTMLElement2 = _interopRequireDefault(_isValidHTMLElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(renderer, mountNode) {
  // mountNode must be a valid HTML element to be able
  // to set mountNode.textContent later on
  if (!(0, _isValidHTMLElement2.default)(mountNode)) {
    throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
  }

  // warns if the DOM node either is not a valid <style> element
  // thus the styles do not get applied as Expected
  // or if the node already got the data-fela-stylesheet attribute applied
  // suggesting it is already used by another Renderer
  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(mountNode.nodeName === 'STYLE', 'You are using a node other than `<style>`. Your styles might not get applied correctly.') : void 0;

  // mark and clean the DOM node to prevent side-effects
  mountNode.setAttribute('data-fela-stylesheet', '');

  var updateNode = (0, _DOMInterface2.default)(renderer, mountNode);
  renderer.subscribe(updateNode);

  var css = renderer.renderToString();

  if (mountNode.textContent !== css) {
    // render currently rendered styles to the DOM once
    mountNode.textContent = css;
  }
} /*  weak */
module.exports = exports['default'];