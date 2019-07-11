'use strict';

var _generateClassName = require('../generateClassName');

var _generateClassName2 = _interopRequireDefault(_generateClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Generating a className', function () {
  it('should return a unique className', function () {
    expect((0, _generateClassName2.default)(1)).toEqual('a');
    expect((0, _generateClassName2.default)(2)).toEqual('b');
    expect((0, _generateClassName2.default)(53)).toEqual('bb');
    expect((0, _generateClassName2.default)(54)).toEqual('bc');
  });

  it('should return the same className', function () {
    expect((0, _generateClassName2.default)(1)).toEqual('a');
    expect((0, _generateClassName2.default)(1)).toEqual('a');
  });
});