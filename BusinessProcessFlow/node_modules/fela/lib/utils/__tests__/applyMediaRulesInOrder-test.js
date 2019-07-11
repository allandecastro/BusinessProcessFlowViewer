'use strict';

var _applyMediaRulesInOrder = require('../applyMediaRulesInOrder');

var _applyMediaRulesInOrder2 = _interopRequireDefault(_applyMediaRulesInOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Applying media rules in order', function () {
  it('should prefill the media rules cache', function () {
    expect((0, _applyMediaRulesInOrder2.default)(['(min-height: 300px)', '(min-height: 500px)'])).toEqual({
      '(min-height: 300px)': '',
      '(min-height: 500px)': ''
    });
  });
});