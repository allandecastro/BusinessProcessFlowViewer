'use strict';

var _friendlyPseudoClass = require('../friendlyPseudoClass');

var _friendlyPseudoClass2 = _interopRequireDefault(_friendlyPseudoClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Friendly pseudo class plugin', function () {
  it('should replace friendly with valid pseudo classes', function () {
    var style = {
      width: 20,
      onHover: { color: 'red' }
    };

    expect((0, _friendlyPseudoClass2.default)()(style)).toEqual({
      width: 20,
      ':hover': { color: 'red' }
    });
  });

  it('should resolve nested pseudo class objects', function () {
    var style = {
      width: 20,
      onHover: {
        width: 30,
        onFocus: { color: 'red' }
      }
    };

    expect((0, _friendlyPseudoClass2.default)()(style)).toEqual({
      width: 20,
      ':hover': {
        width: 30,
        ':focus': { color: 'red' }
      }
    });
  });

  it('should resolve nested media objects', function () {
    var style = {
      width: 20,
      '@media (min-height: 300px)': {
        width: 30,
        onFocus: {
          color: 'red',
          onHover: { color: 'blue' }
        }
      }
    };

    expect((0, _friendlyPseudoClass2.default)()(style)).toEqual({
      width: 20,
      '@media (min-height: 300px)': {
        width: 30,
        ':focus': {
          color: 'red',
          ':hover': { color: 'blue' }
        }
      }
    });
  });
});