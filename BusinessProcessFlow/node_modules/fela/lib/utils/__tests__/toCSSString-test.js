'use strict';

var _toCSSString = require('../toCSSString');

var _toCSSString2 = _interopRequireDefault(_toCSSString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Transforming strings to CSSStrings', function () {
  it('should wrap strings in double quotes', function () {
    expect((0, _toCSSString2.default)('Arial')).toEqual('"Arial"');
  });

  it('should not add additional double quotes', function () {
    expect((0, _toCSSString2.default)('"Arial"')).toEqual('"Arial"');
  });
});