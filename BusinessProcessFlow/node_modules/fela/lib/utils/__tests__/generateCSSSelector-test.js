'use strict';

var _generateCSSSelector = require('../generateCSSSelector');

var _generateCSSSelector2 = _interopRequireDefault(_generateCSSSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Generating css selectors', function () {
  it('should return a valid css selector', function () {
    expect((0, _generateCSSSelector2.default)('foo')).toEqual('.foo');
    expect((0, _generateCSSSelector2.default)('foo', ':hover')).toEqual('.foo:hover');
  });
});