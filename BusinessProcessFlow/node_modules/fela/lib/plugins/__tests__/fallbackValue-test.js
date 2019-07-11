'use strict';

var _fallbackValue = require('../fallbackValue');

var _fallbackValue2 = _interopRequireDefault(_fallbackValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Fallback value plugin', function () {
  it('should resolve fallback value arrays to strings', function () {
    var style = { width: ['-webkit-calc(20px)', 'calc(20px)'] };

    expect((0, _fallbackValue2.default)()(style)).toEqual({ width: '-webkit-calc(20px);width:calc(20px)' });
  });

  it('should convert properties to dash case within value', function () {
    var style = { marginLeft: ['-webkit-calc(20px)', 'calc(20px)'] };

    expect((0, _fallbackValue2.default)()(style)).toEqual({ marginLeft: '-webkit-calc(20px);margin-left:calc(20px)' });
  });

  it('should resolve nested style objects', function () {
    var style = {
      marginLeft: ['-webkit-calc(20px)', 'calc(20px)'],
      ':hover': { width: ['-webkit-calc(20px)', 'calc(20px)'] }
    };

    expect((0, _fallbackValue2.default)()(style)).toEqual({
      marginLeft: '-webkit-calc(20px);margin-left:calc(20px)',
      ':hover': { width: '-webkit-calc(20px);width:calc(20px)' }
    });
  });
});