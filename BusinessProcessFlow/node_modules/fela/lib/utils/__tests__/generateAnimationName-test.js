'use strict';

var _generateAnimationName = require('../generateAnimationName');

var _generateAnimationName2 = _interopRequireDefault(_generateAnimationName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Generating a animation name', function () {
  it('should return a valid animation name', function () {
    expect((0, _generateAnimationName2.default)(0)).toEqual('k0');
    expect((0, _generateAnimationName2.default)(12)).toEqual('k12');
  });
});