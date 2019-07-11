'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectReduce = require('../utils/objectReduce');

var _objectReduce2 = _interopRequireDefault(_objectReduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: function create(styleSheet) {
    return (0, _objectReduce2.default)(styleSheet, function (ruleSheet, rule, ruleName) {
      if (typeof rule === 'function') {
        ruleSheet[ruleName] = rule;
      } else {
        ruleSheet[ruleName] = function () {
          return rule;
        };
      }

      return ruleSheet;
    }, {});
  }
};
module.exports = exports['default'];