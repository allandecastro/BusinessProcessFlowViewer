'use strict';

var _cssifyFontFace = require('../cssifyFontFace');

var _cssifyFontFace2 = _interopRequireDefault(_cssifyFontFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cssifying font faces', function () {
  it('should generate a valid CSS string', function () {
    expect((0, _cssifyFontFace2.default)({
      fontFamily: '"Bar"',
      fontWeight: 300,
      src: 'url(foo/bar.ttf) format(ttf)'
    })).toEqual('@font-face{font-family:"Bar";font-weight:300;src:url(foo/bar.ttf) format(ttf)}');
  });
});