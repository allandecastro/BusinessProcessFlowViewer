'use strict';

var _DOMInterface = require('../DOMInterface');

var _DOMInterface2 = _interopRequireDefault(_DOMInterface);

var _createRenderer = require('../../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

var _DOMNode = require('./mocks/DOMNode');

var _DOMNode2 = _interopRequireDefault(_DOMNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Updating DOM nodes', function () {
  it('should clear the DOM node', function () {
    process.env.NODE_ENV = 'production';
    var node = (0, _DOMNode2.default)();

    var renderer = (0, _createRenderer2.default)();
    var updateNode = (0, _DOMInterface2.default)(renderer, node);

    node.textContent = 'testtest';
    renderer.subscribe(updateNode);

    renderer.clear();

    expect(node.textContent).toEqual('');
  });

  it('should add a rule to the cssRules', function () {
    process.env.NODE_ENV = 'production';
    var node = (0, _DOMNode2.default)();

    var renderer = (0, _createRenderer2.default)();
    var updateNode = (0, _DOMInterface2.default)(renderer, node);

    renderer.subscribe(updateNode);
    renderer.renderRule(function () {
      return { color: 'red' };
    });

    expect(node.sheet.cssRules).toEqual(['.a{color:red}']);
  });

  it('should use the static renderer in development', function () {
    process.env.NODE_ENV = 'development';

    var node = (0, _DOMNode2.default)();

    var renderer = (0, _createRenderer2.default)();
    var updateNode = (0, _DOMInterface2.default)(renderer, node);

    renderer.subscribe(updateNode);
    renderer.renderStatic({ color: 'red' }, '.class');

    expect(node.textContent).toEqual('.class{color:red}');
  });

  it('should add new rules after all other rules', function () {
    process.env.NODE_ENV = 'production';
    var node = (0, _DOMNode2.default)();

    var renderer = (0, _createRenderer2.default)();
    var updateNode = (0, _DOMInterface2.default)(renderer, node);

    renderer.subscribe(updateNode);
    renderer.renderRule(function () {
      return { color: 'red' };
    });
    renderer.renderRule(function () {
      return { color: 'blue' };
    });

    expect(node.sheet.cssRules).toEqual(['.a{color:red}', '.b{color:blue}']);
  });
});