'use strict';

var _isMediaQuery = require('../isMediaQuery');

var _isMediaQuery2 = _interopRequireDefault(_isMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validating media queries', function () {
  it('should return true', function () {
    expect((0, _isMediaQuery2.default)('@media (min-height: 300px)')).toEqual(true);
  });

  it('should return false', function () {
    expect((0, _isMediaQuery2.default)(':hover')).toEqual(false);
    expect((0, _isMediaQuery2.default)('div')).toEqual(false);
  });
});