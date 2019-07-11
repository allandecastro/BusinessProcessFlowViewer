'use strict';

var _combineRules = require('../combineRules');

var _combineRules2 = _interopRequireDefault(_combineRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Combining rules', function () {
  it('should create a combined rule', function () {
    var rule = function rule(props) {
      return {
        color: 'red',
        fontSize: props.fontSize,
        lineHeight: props.lineHeight,
        padding: 10
      };
    };

    var anotherRule = function anotherRule(props) {
      return {
        backgroundColor: 'blue',
        lineHeight: props.lineHeight * 2,
        padding: 20
      };
    };

    var combineRule = (0, _combineRules2.default)(rule, anotherRule);

    expect(combineRule({
      fontSize: 12,
      lineHeight: 10
    })).toEqual({
      color: 'red',
      backgroundColor: 'blue',
      fontSize: 12,
      lineHeight: 20,
      padding: 20
    });
  });
});