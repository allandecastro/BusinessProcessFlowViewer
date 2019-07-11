'use strict';

var _generateCSSRule = require('../generateCSSRule');

var _generateCSSRule2 = _interopRequireDefault(_generateCSSRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Generating css rules', function () {
  it('should return a valid css rule', function () {
    expect((0, _generateCSSRule2.default)('.foo', 'color:red')).toEqual('.foo{color:red}');
  });
});