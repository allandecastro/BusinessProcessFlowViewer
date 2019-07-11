'use strict';

var _cssifyMediaQueryRules = require('../cssifyMediaQueryRules');

var _cssifyMediaQueryRules2 = _interopRequireDefault(_cssifyMediaQueryRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cssifying media query rules', function () {
  it('should generate a valid CSS string', function () {
    expect((0, _cssifyMediaQueryRules2.default)('(min-height: 300px)', 'color:red')).toEqual('@media (min-height: 300px){color:red}');
  });
});