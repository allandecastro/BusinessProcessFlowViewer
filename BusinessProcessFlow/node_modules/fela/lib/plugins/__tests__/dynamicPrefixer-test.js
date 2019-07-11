'use strict';

var _dynamicPrefixer = require('../dynamicPrefixer');

var _dynamicPrefixer2 = _interopRequireDefault(_dynamicPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Dynamic Prefixer plugin', function () {
  it('should prefix styles', function () {
    var style = {
      transition: '200ms all linear',
      userSelect: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      color: 'blue'
    };

    expect((0, _dynamicPrefixer2.default)({ userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/25.0.1216.0 Safari/537.2' })(style)).toEqual({
      transition: '200ms all linear',
      WebkitUserSelect: 'none',
      boxSizing: 'border-box',
      display: '-webkit-flex',
      color: 'blue'
    });
  });
});