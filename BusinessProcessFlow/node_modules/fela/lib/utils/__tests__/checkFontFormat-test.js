'use strict';

var _checkFontFormat = require('../checkFontFormat');

var _checkFontFormat2 = _interopRequireDefault(_checkFontFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Checking the font format', function () {
  it('should return the correct format', function () {
    expect((0, _checkFontFormat2.default)('foo.ttf')).toEqual('truetype');
    expect((0, _checkFontFormat2.default)('foo.eot')).toEqual('eot');
  });

  it('should return an empty string', function () {
    expect((0, _checkFontFormat2.default)('foobar.png')).toEqual('');
  });
});