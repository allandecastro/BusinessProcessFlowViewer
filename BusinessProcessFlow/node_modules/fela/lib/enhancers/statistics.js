'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable prefer-rest-params */


var _gzipSize = require('gzip-size');

var _gzipSize2 = _interopRequireDefault(_gzipSize);

var _styleTypes = require('../utils/styleTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function addStatistics(renderer) {
  var statistics = {
    count: {
      classes: 0,
      pseudoClasses: 0
    },
    usage: {},
    size: {},
    reuse: {},
    totalPseudoClasses: 0,
    totalMediaQueryClasses: 0,
    totalClasses: 0,
    totalRenders: 0,
    totalUsage: 0
  };

  function addClassNamesToUsage(classNames) {
    classNames.split(' ').forEach(function (className) {
      if (!statistics.usage[className]) {
        statistics.usage[className] = 0;
      }
      statistics.usage[className]++;
      statistics.totalUsage++;
    });
  }

  var existingRenderRule = renderer.renderRule;
  renderer.renderRule = function renderRule() {
    statistics.totalRenders++;
    var classNames = existingRenderRule.apply(renderer, arguments);
    addClassNamesToUsage(classNames);
    return classNames;
  };

  renderer.subscribe(function (_ref) {
    var type = _ref.type,
        selector = _ref.selector,
        media = _ref.media,
        isStatic = _ref.static;

    if (type === _styleTypes.RULE_TYPE && !isStatic) {
      statistics.totalClasses++;
      var isPseudoSelector = selector.indexOf(':') > -1;
      if (media) {
        statistics.totalMediaQueryClasses++;

        if (!statistics.count[media]) {
          statistics.count[media] = {
            pseudoClasses: 0,
            classes: 0
          };
        }

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++;
          statistics.count[media].pseudoClasses++;
        } else {
          statistics.count[media].classes++;
        }
      } else {
        statistics.totalClasses++;

        if (isPseudoSelector) {
          statistics.totalPseudoClasses++;
          statistics.count.pseudoClasses++;
        } else {
          statistics.count.classes++;
        }
      }
    }
  });

  function calculateReuse() {
    var quotient = (statistics.totalUsage - statistics.totalClasses) / statistics.totalUsage;
    return Math.floor(quotient * 10000) / 10000;
  }

  renderer.getStatistics = function () {
    var currentStats = _extends({}, statistics);

    var reuse = calculateReuse();
    currentStats.reuse = {
      percentage: reuse * 100 + '%',
      number: reuse
    };

    var currentCSS = renderer.renderToString();
    var bytes = lengthInUtf8Bytes(currentCSS);

    currentStats.size = {
      bytes: bytes,
      bytesGzipped: _gzipSize2.default.sync(currentCSS),
      kbytes: Math.floor(bytes / 10) / 100,
      kbytesGzipped: Math.floor(_gzipSize2.default.sync(currentCSS) / 10) / 100
    };

    return currentStats;
  };

  return renderer;
}

exports.default = function () {
  return addStatistics;
};

module.exports = exports['default'];