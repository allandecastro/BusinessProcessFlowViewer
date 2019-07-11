'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _processStyleWithPlugins = require('../processStyleWithPlugins');

var _processStyleWithPlugins2 = _interopRequireDefault(_processStyleWithPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RULE_TYPE = 1;

describe('Processing style', function () {
  it('should process style using data provided via the plugin interface', function () {
    var plugin = function plugin(style) {
      return _extends({}, style, {
        foo: 'bar'
      });
    };

    expect((0, _processStyleWithPlugins2.default)([plugin], { width: 20 })).toEqual({
      width: 20,
      foo: 'bar'
    });
  });

  it('should pass the style type', function () {
    var plugin = function plugin(style, type) {
      return _extends({}, style, {
        foo: type
      });
    };

    expect((0, _processStyleWithPlugins2.default)([plugin], { width: 20 }, RULE_TYPE)).toEqual({
      width: 20,
      foo: 1
    });
  });
});