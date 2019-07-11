'use strict';

var _generateStaticReference = require('../generateStaticReference');

var _generateStaticReference2 = _interopRequireDefault(_generateStaticReference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Generating static style references', function () {
  it('should return a valid css selector', function () {
    expect((0, _generateStaticReference2.default)('.foo{color:red}')).toEqual('.foo{color:red}');
    expect((0, _generateStaticReference2.default)({ color: 'red' }, '.foo')).toEqual('.foo{"color":"red"}');
  });
});