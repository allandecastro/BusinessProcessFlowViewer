'use strict';

var _customProperty = require('../customProperty');

var _customProperty2 = _interopRequireDefault(_customProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Custom property plugin', function () {
  it('should resolve custom properties', function () {
    var position = function position(positions) {
      return {
        top: positions[0],
        right: positions[1],
        bottom: positions[2],
        left: positions[3]
      };
    };

    var style = {
      width: 20,
      position: [0, 20, 50, 20]
    };

    expect((0, _customProperty2.default)({ position: position })(style)).toEqual({
      width: 20,
      top: 0,
      right: 20,
      bottom: 50,
      left: 20
    });
  });

  it('should resolve nested style objects', function () {
    var position = function position(positions) {
      return {
        top: positions[0],
        right: positions[1],
        bottom: positions[2],
        left: positions[3]
      };
    };

    var style = {
      width: 20,
      onHover: { position: [0, 20, 50, 20] }
    };

    expect((0, _customProperty2.default)({ position: position })(style)).toEqual({
      width: 20,
      onHover: {
        top: 0,
        right: 20,
        bottom: 50,
        left: 20
      }
    });
  });
});