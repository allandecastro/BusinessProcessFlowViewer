'use strict';

var _isNestedSelector = require('../isNestedSelector');

var _isNestedSelector2 = _interopRequireDefault(_isNestedSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validating nested selectors', function () {
  it('should return true', function () {
    expect((0, _isNestedSelector2.default)(':hover')).toEqual(true);
    expect((0, _isNestedSelector2.default)('[foo="true"]')).toEqual(true);
    expect((0, _isNestedSelector2.default)('> div')).toEqual(true);
    expect((0, _isNestedSelector2.default)('& .foo')).toEqual(true);
    expect((0, _isNestedSelector2.default)('& ~ #id')).toEqual(true);
  });

  it('should return false', function () {
    expect((0, _isNestedSelector2.default)('.foo')).toEqual(false);
    expect((0, _isNestedSelector2.default)(' .foo')).toEqual(false);
    expect((0, _isNestedSelector2.default)('~ #id')).toEqual(false);
  });
});