'use strict';

var _placeholderPrefixer = require('../placeholderPrefixer');

var _placeholderPrefixer2 = _interopRequireDefault(_placeholderPrefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Placeholder prefixer plugin', function () {
  it('should add placeholder prefixes', function () {
    var style = {
      width: 20,
      '::placeholder': { color: 'red' }
    };

    expect((0, _placeholderPrefixer2.default)()(style)).toEqual({
      width: 20,
      '::-webkit-input-placeholder': { color: 'red' },
      '::-moz-placeholder': { color: 'red' },
      ':-ms-input-placeholder': { color: 'red' },
      ':-moz-placeholder': { color: 'red' },
      '::placeholder': { color: 'red' }
    });
  });
});