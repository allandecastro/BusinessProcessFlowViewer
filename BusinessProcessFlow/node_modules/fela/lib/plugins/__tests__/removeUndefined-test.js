'use strict';

var _removeUndefined = require('../removeUndefined');

var _removeUndefined2 = _interopRequireDefault(_removeUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Remove undefined plugin', function () {
  it('should remove all undefined values', function () {
    var style = {
      color: 'blue',
      fontSize: undefined,
      border: 'undefinedpx solid blue',
      ':hover': { color: ['rgba(0, 0, 0, 0.4)', undefined, 'black'] }
    };

    expect((0, _removeUndefined2.default)()(style)).toEqual({
      color: 'blue',
      ':hover': { color: ['rgba(0, 0, 0, 0.4)', 'black'] }
    });
  });
});