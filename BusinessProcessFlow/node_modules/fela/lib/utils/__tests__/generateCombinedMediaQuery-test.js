'use strict';

var _generateCombinedMediaQuery = require('../generateCombinedMediaQuery');

var _generateCombinedMediaQuery2 = _interopRequireDefault(_generateCombinedMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Combining media queries', function () {
  it('should return the combined query', function () {
    expect((0, _generateCombinedMediaQuery2.default)('', '(min-height: 300px)')).toEqual('(min-height: 300px)');
    expect((0, _generateCombinedMediaQuery2.default)('(min-width: 400px)', '(min-height: 300px)')).toEqual('(min-width: 400px) and (min-height: 300px)');
  });
});