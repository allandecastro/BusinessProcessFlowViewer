'use strict';

var _unit = require('../unit');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Unit plugin', function () {
  it('should add units to number values', function () {
    var style = {
      width: 46,
      height: '34',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: 2,
      margin: [23, '45', '3px'],
      opacity: [23, '5']
    };

    expect((0, _unit2.default)('px')(style)).toEqual({
      width: '46px',
      height: '34px',
      lineHeight: 3.2,
      WebkitFlex: 1,
      WebkitBorderRadius: '2px',
      margin: ['23px', '45px', '3px'],
      opacity: [23, '5']
    });
  });

  it('should add units to nested style objects', function () {
    var style = {
      width: 46,
      ':hover': { height: 34 }
    };

    expect((0, _unit2.default)('px')(style)).toEqual({
      width: '46px',
      ':hover': { height: '34px' }
    });
  });

  it('should default to px', function () {
    var style = { width: 46 };
    expect((0, _unit2.default)()(style)).toEqual({ width: '46px' });
  });

  it('should accept units other than px', function () {
    var style = { width: 46 };
    expect((0, _unit2.default)('em')(style)).toEqual({ width: '46em' });
  });

  it('should add property specific units', function () {
    var style = {
      width: 46,
      height: 50,
      margin: 10,
      fontSize: 15
    };
    expect((0, _unit2.default)('px', {
      margin: '%',
      fontSize: 'pt'
    })(style)).toEqual({
      width: '46px',
      height: '50px',
      margin: '10%',
      fontSize: '15pt'
    });
  });
});