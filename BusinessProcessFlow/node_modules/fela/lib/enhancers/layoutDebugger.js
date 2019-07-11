'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = layoutDebugger;


function addLayoutDebugger(renderer, options) {
  var existingRenderRule = renderer.renderRule.bind(renderer);

  renderer.renderRule = function (rule, props) {
    var className = existingRenderRule(rule, props);

    var ruleName = rule.name || 'debug_layout';
    var color = (ruleName + ruleName).length * 17 * ruleName.length;

    var debugLayoutClassName = 'fela-debug-layout_' + ruleName;

    if (options.backgroundColor) {
      renderer.renderStatic({ backgroundColor: 'hsla(' + color + ', 100%, 25%, 0.1) !important' }, '.' + debugLayoutClassName);
    } else {
      renderer.renderStatic({ outline: options.thickness + 'px solid hsl(' + color + ', 100%, 50%) !important' }, '.' + debugLayoutClassName);
    }

    return debugLayoutClassName + ' ' + className;
  };

  return renderer;
}


var defaultOptions = {
  backgroundColor: false,
  thickness: 1
};

function layoutDebugger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (renderer) {
    return addLayoutDebugger(renderer, _extends({}, defaultOptions, options));
  };
}
module.exports = exports['default'];