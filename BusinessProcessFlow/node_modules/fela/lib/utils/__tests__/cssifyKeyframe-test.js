'use strict';

var _cssifyKeyframe = require('../cssifyKeyframe');

var _cssifyKeyframe2 = _interopRequireDefault(_cssifyKeyframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Cssifying keyframes', function () {
  it('should generate a valid CSS string', function () {
    expect((0, _cssifyKeyframe2.default)({
      from: { color: 'blue' },
      to: { color: 'red' }
    }, 'foo')).toEqual('@keyframes foo{from{color:blue}to{color:red}}');
  });

  it('should generated -webkit- prefixed keyframe string', function () {
    expect((0, _cssifyKeyframe2.default)({
      from: { color: 'blue' },
      to: { color: 'red' }
    }, 'foo', ['-webkit-'])).toEqual('@-webkit-keyframes foo{from{color:blue}to{color:red}}');
  });

  it('should generated both -webkit- prefixed and unprefixed keyframe string', function () {
    expect((0, _cssifyKeyframe2.default)({
      from: { color: 'blue' },
      to: { color: 'red' }
    }, 'foo', ['-webkit-', ''])).toEqual('@-webkit-keyframes foo{from{color:blue}to{color:red}}@keyframes foo{from{color:blue}to{color:red}}');
  });
});