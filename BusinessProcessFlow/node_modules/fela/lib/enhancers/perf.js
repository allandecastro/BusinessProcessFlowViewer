'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = perf;

/* eslint-disable no-console */
var counter = 0;

function addPerfTool(renderer) {
  var existingRenderRule = renderer.renderRule.bind(renderer);

  renderer.renderRule = function (rule, props) {
    var timerCounter = '[' + ++counter + ']';

    console.time(timerCounter);
    // eslint-disable-line
    var className = existingRenderRule(rule, props);
    console.log(timerCounter + ' ' + (rule.name || 'anonym'), props);
    // eslint-disable-line
    console.timeEnd(timerCounter);

    // eslint-disable-line
    return className;
  };

  return renderer;
}

function perf() {
  return addPerfTool;
}
module.exports = exports['default'];