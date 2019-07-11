'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mapValueToMediaQuery = require('../mapValueToMediaQuery');

var _mapValueToMediaQuery2 = _interopRequireDefault(_mapValueToMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mapping values to media queries', function () {
  it('should generate valid media queries', function () {
    var rule = function rule(props) {
      return _extends({
        color: 'blue'
      }, (0, _mapValueToMediaQuery2.default)(props.sizes, function (value) {
        return { fontSize: value + 'px' };
      }));
    };

    var style = rule({
      sizes: {
        '@media (min-width: 300px)': 12,
        '@media (min-width: 480px)': 14
      }
    });
    expect(style).toEqual({
      color: 'blue',
      '@media (min-width: 300px)': { fontSize: '12px' },
      '@media (min-width: 480px)': { fontSize: '14px' }
    });
  });

  it('should generate valid media queries using the shortcut property', function () {
    var rule = function rule(props) {
      return _extends({
        color: 'blue'
      }, (0, _mapValueToMediaQuery2.default)(props.colors, 'color'));
    };

    var style = rule({
      colors: {
        '@media (min-width: 300px)': 'red',
        '@media (min-width: 480px)': 'green'
      }
    });
    expect(style).toEqual({
      color: 'blue',
      '@media (min-width: 300px)': { color: 'red' },
      '@media (min-width: 480px)': { color: 'green' }
    });
  });
});