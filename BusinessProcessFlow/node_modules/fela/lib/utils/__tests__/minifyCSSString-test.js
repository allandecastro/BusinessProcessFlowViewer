'use strict';

var _minifyCSSString = require('../minifyCSSString');

var _minifyCSSString2 = _interopRequireDefault(_minifyCSSString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Minifying CSS strings', function () {
  it('should return a minified CSS string', function () {
    expect((0, _minifyCSSString2.default)('.foo{color:bar}')).toEqual('.foo{color:bar}');
    expect((0, _minifyCSSString2.default)('\n   .foo {\n      color: bar\n   }\n\n   .baz {\n     font-size: 12px\n   }\n      ')).toEqual('.foo {color: bar}.baz {font-size: 12px}');
  });
});