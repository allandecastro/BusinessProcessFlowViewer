'use strict';

var _prefixer = require('../prefixer');

var _prefixer2 = _interopRequireDefault(_prefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Prefixer plugin', function () {
  it('should prefix styles', function () {
    var style = {
      display: 'flex',
      justifyContent: 'center'
    };

    expect((0, _prefixer2.default)()(style)).toEqual({
      justifyContent: 'center;-webkit-box-pack:center;-webkit-justify-content:center',
      display: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex']
    });
  });

  it('should prefix nested objects', function () {
    var style = {
      display: 'flex',
      ':hover': { justifyContent: 'center' }
    };

    expect((0, _prefixer2.default)()(style)).toEqual({
      ':hover': { justifyContent: 'center;-webkit-box-pack:center;-webkit-justify-content:center' },
      display: ['-webkit-box', '-moz-box', '-ms-flexbox', '-webkit-flex', 'flex']
    });
  });
});