'use strict';

var _LVHA = require('../LVHA');

var _LVHA2 = _interopRequireDefault(_LVHA);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LVHA plugin', function () {
  it('should sort pseudo classes correctly', function () {
    var setting = {
      ':hover': {},
      ':focus': {},
      ':link': {},
      ':first-child': {},
      ':active': {},
      ':visited': {}
    };

    expect((0, _LVHA2.default)()(setting)).toEqual({
      ':link': {},
      ':visited': {},
      ':hover': {},
      ':focus': {},
      ':active': {},
      ':first-child': {}
    });
  });
});