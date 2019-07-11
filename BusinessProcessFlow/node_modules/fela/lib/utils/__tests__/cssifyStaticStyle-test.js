'use strict';

var _cssifyStaticStyle = require('../cssifyStaticStyle');

var _cssifyStaticStyle2 = _interopRequireDefault(_cssifyStaticStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cssifying static css declarations', function () {
  it('should return the minified style string', function () {
    expect((0, _cssifyStaticStyle2.default)('.foo{color:red}')).toEqual('.foo{color:red}');
    expect((0, _cssifyStaticStyle2.default)('\n      .foo {\n        color: red\n      }\n      ')).toEqual('.foo {color: red}');
  });

  it('should cssify the static style', function () {
    expect((0, _cssifyStaticStyle2.default)({
      color: 'red',
      WebkitTransitionDuration: 3
    }, [])).toEqual('color:red;-webkit-transition-duration:3');
  });
});