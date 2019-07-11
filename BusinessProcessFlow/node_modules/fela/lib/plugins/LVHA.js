'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LVHA;

var _arrayEach = require('../utils/arrayEach');

var _arrayEach2 = _interopRequireDefault(_arrayEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var precedence = {
  ':link': 0,
  ':visited': 1,
  ':hover': 2,
  ':focus': 3,
  ':active': 4
};


var pseudoClasses = Object.keys(precedence);

function orderLVHA(style) {
  var pseudoList = [];

  for (var property in style) {
    if (precedence.hasOwnProperty(property)) {
      pseudoList[precedence[property]] = style[property];
      delete style[property];
    }
  }

  (0, _arrayEach2.default)(pseudoList, function (pseudoStyle, index) {
    if (pseudoStyle) {
      style[pseudoClasses[index]] = pseudoStyle;
    }
  });

  return style;
}

function LVHA() {
  return orderLVHA;
}
module.exports = exports['default'];