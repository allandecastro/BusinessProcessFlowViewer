'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _enhance = require('../enhance');

var _enhance2 = _interopRequireDefault(_enhance);

var _createRenderer = require('../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Enhancing renderers', function () {
  it('should enhance a renderer', function () {
    var enhancer = function enhancer(renderer) {
      return _extends({}, renderer, {
        greet: function greet(name) {
          return 'Hello ' + name;
        }
      });
    };

    var enhancedRenderer = (0, _enhance2.default)(enhancer)(_createRenderer2.default)();
    expect(enhancedRenderer.greet).toBeInstanceOf(Function);
    expect(enhancedRenderer.greet('World')).toEqual('Hello World');
  });

  it('should enhance a renderer multiple times', function () {
    var enhancer = function enhancer(renderer) {
      return _extends({}, renderer, {
        greet: function greet(name) {
          return 'Hello ' + name;
        }
      });
    };

    var anotherEnhancer = function anotherEnhancer(renderer) {
      return _extends({}, renderer, {
        foo: 'bar'
      });
    };

    var enhancedRenderer = (0, _enhance2.default)(enhancer, anotherEnhancer)(_createRenderer2.default)();
    expect(enhancedRenderer.greet).toBeInstanceOf(Function);
    expect(enhancedRenderer.greet('World')).toEqual('Hello World');
    expect(enhancedRenderer.foo).toEqual('bar');
  });
});