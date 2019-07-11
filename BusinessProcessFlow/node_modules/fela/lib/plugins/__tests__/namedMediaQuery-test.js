'use strict';

var _namedMediaQuery = require('../namedMediaQuery');

var _namedMediaQuery2 = _interopRequireDefault(_namedMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Named media query plugin', function () {
  it('should replace named media queries with real media queries', function () {
    var style = {
      width: 20,
      desktop: { color: 'red' }
    };

    expect((0, _namedMediaQuery2.default)({ desktop: '@media (min-width: 300px)' })(style)).toEqual({
      width: 20,
      '@media (min-width: 300px)': { color: 'red' }
    });
  });

  it('should resolve nested named media queries', function () {
    var style = {
      width: 20,
      tablet: {
        width: 30,
        desktop: { color: 'red' }
      }
    };

    expect((0, _namedMediaQuery2.default)({
      desktop: '@media (min-width: 300px)',
      tablet: '@media (min-width: 150px)'
    })(style)).toEqual({
      width: 20,
      '@media (min-width: 150px)': {
        width: 30,
        '@media (min-width: 300px)': { color: 'red' }
      }
    });
  });
});