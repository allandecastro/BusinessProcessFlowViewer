'use strict';

var _createRenderer = require('../../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

var _render = require('../render');

var _render2 = _interopRequireDefault(_render);

var _DOMNode = require('./mocks/DOMNode');

var _DOMNode2 = _interopRequireDefault(_DOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Rendering into a DOM node', function () {
  it('should subscribe to changes', function () {
    var rule = function rule() {
      return { color: 'red' };
    };
    var node = (0, _DOMNode2.default)();
    var renderer = (0, _createRenderer2.default)();

    process.env.NODE_ENV = 'production';

    (0, _render2.default)(renderer, node);
    renderer.renderRule(rule);

    expect(node.sheet.cssRules).toEqual(['.a{color:red}']);
    expect(renderer.listeners.length).toEqual(1);
  });

  it('should only update the DOM if it does not match the CSS', function () {
    var rule = function rule() {
      return { color: 'red' };
    };

    var node = (0, _DOMNode2.default)();

    node.textContent = 'foo';

    var renderer = (0, _createRenderer2.default)();
    renderer.renderRule(rule);

    (0, _render2.default)(renderer, node);

    expect(node.textContent).toEqual('.a{color:red}');
  });

  it('should set the data-fela-stylesheet attribute', function () {
    var node = (0, _DOMNode2.default)();

    var renderer = (0, _createRenderer2.default)();
    (0, _render2.default)(renderer, node);

    expect(node.hasAttribute('data-fela-stylesheet')).toEqual(true);
  });

  it('should throw if an invalid mountNode is passed', function () {
    expect(function () {
      (0, _render2.default)((0, _createRenderer2.default)(), {});
    }).toThrow('You need to specify a valid element node (nodeType = 1) to render into.');
  });
});