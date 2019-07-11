'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable no-console */


exports.default = validator;

var _styleTypes = require('../utils/styleTypes');

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isNestedSelector = require('../utils/isNestedSelector');

var _isNestedSelector2 = _interopRequireDefault(_isNestedSelector);

var _isMediaQuery = require('../utils/isMediaQuery');

var _isMediaQuery2 = _interopRequireDefault(_isMediaQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var percentageRegex = /from|to|%/;

function validateStyleObject(style, logInvalid, deleteInvalid) {
  for (var property in style) {
    var value = style[property];

    if ((0, _isObject2.default)(value)) {
      if ((0, _isNestedSelector2.default)(property) || (0, _isMediaQuery2.default)(property)) {
        validateStyleObject(value, logInvalid, deleteInvalid);
      } else {
        if (deleteInvalid) {
          delete style[property];
        }
        if (logInvalid) {
          console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid nested property. Only use nested media queries, pseudo classes, child selectors or &-combinators.\n              Maybe you forgot to add a plugin that resolves "' + property + '".', {
            property: property,
            value: value
          });
        }
      }
    }
  }
}

function isValidPercentage(percentage) {
  var percentageValue = parseFloat(percentage);

  return percentage.indexOf('%') > -1 && (percentageValue < 0 || percentageValue > 100);
}

function validateKeyframeObject(style, logInvalid, deleteInvalid) {
  for (var percentage in style) {
    var value = style[percentage];
    if (!(0, _isObject2.default)(value)) {
      if (logInvalid) {
        console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe value. An object was expected.', {
          percentage: percentage,
          style: value
        });
      }
      if (deleteInvalid) {
        delete style[percentage];
      }
      // check for invalid percentage values, it only allows from, to or 0% - 100%
    } else if (!percentageRegex.test(percentage) || !isValidPercentage(percentage)) {
      if (logInvalid) {
        console.error((deleteInvalid ? '[Deleted] ' : ' ') + 'Invalid keyframe property.\n              Expected either `to`, `from` or a percentage value between 0 and 100.', {
          percentage: percentage,
          style: value
        });
      }
      if (deleteInvalid) {
        delete style[percentage];
      }
    }
  }
}

function validateStyle(style, type, options) {
  var logInvalid = options.logInvalid,
      deleteInvalid = options.deleteInvalid;


  if (type === _styleTypes.KEYFRAME_TYPE) {
    validateKeyframeObject(style, logInvalid, deleteInvalid);
  } else if (type === _styleTypes.RULE_TYPE) {
    validateStyleObject(style, logInvalid, deleteInvalid);
  }

  return style;
}

var defaultOptions = {
  logInvalid: true,
  deleteInvalid: false
};

function validator() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (style, type) {
    return validateStyle(style, type, _extends({}, defaultOptions, options));
  };
}
module.exports = exports['default'];