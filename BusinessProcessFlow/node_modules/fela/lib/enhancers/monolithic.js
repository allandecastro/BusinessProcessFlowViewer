'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/* eslint-disable no-continue */


exports.default = monolithic;

var _cssifyDeclaration = require('css-in-js-utils/lib/cssifyDeclaration');

var _cssifyDeclaration2 = _interopRequireDefault(_cssifyDeclaration);

var _cssifyMediaQueryRules = require('../utils/cssifyMediaQueryRules');

var _cssifyMediaQueryRules2 = _interopRequireDefault(_cssifyMediaQueryRules);

var _generateCombinedMediaQuery = require('../utils/generateCombinedMediaQuery');

var _generateCombinedMediaQuery2 = _interopRequireDefault(_generateCombinedMediaQuery);

var _generateCSSRule = require('../utils/generateCSSRule');

var _generateCSSRule2 = _interopRequireDefault(_generateCSSRule);

var _generateCSSSelector = require('../utils/generateCSSSelector');

var _generateCSSSelector2 = _interopRequireDefault(_generateCSSSelector);

var _isMediaQuery = require('../utils/isMediaQuery');

var _isMediaQuery2 = _interopRequireDefault(_isMediaQuery);

var _isNestedSelector = require('../utils/isNestedSelector');

var _isNestedSelector2 = _interopRequireDefault(_isNestedSelector);

var _isUndefinedValue = require('../utils/isUndefinedValue');

var _isUndefinedValue2 = _interopRequireDefault(_isUndefinedValue);

var _normalizeNestedProperty = require('../utils/normalizeNestedProperty');

var _normalizeNestedProperty2 = _interopRequireDefault(_normalizeNestedProperty);

var _styleTypes = require('../utils/styleTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateClassName(style, prefix) {
  if (style.className) {
    var name = prefix + style.className;
    delete style.className;
    return name;
  }
  var stringified = JSON.stringify(style);
  var val = 5381;
  var i = stringified.length;

  while (i) {
    val = val * 33 ^ stringified.charCodeAt(--i);
  }

  return prefix + (val >>> 0).toString(36);
}

function useMonolithicRenderer(renderer) {
  renderer._parseMonolithicRules = function (selector, styles) {
    var mediaSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var decs = [];
    var rules = [];
    var media = [];

    var _loop = function _loop(key) {
      var value = styles[key];
      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

      if ((0, _isUndefinedValue2.default)(value)) {
        return 'continue';
      } else if (type === 'number' || type === 'string') {
        decs.push((0, _cssifyDeclaration2.default)(key, value));
        return 'continue';
      } else if (Array.isArray(value)) {
        value.forEach(function (val) {
          return decs.push((0, _cssifyDeclaration2.default)(key, val));
        });
        return 'continue';
      } else if ((0, _isNestedSelector2.default)(key)) {
        renderer._parseMonolithicRules(selector + (0, _normalizeNestedProperty2.default)(key), value, mediaSelector).rules.forEach(function (r) {
          return rules.push(r);
        });
        return 'continue';
      } else if ((0, _isMediaQuery2.default)(key)) {
        var mediaKey = (0, _generateCombinedMediaQuery2.default)(mediaSelector, key.slice(6).trim());
        var mediaRules = renderer._parseMonolithicRules(selector, value, mediaKey);
        media.push({
          rules: mediaRules.rules,
          media: mediaKey
        });
        mediaRules.media.forEach(function (r) {
          return media.push(r);
        });
        return 'continue';
      } else {
        renderer._parseMonolithicRules(selector + ' ' + key, value, mediaSelector).rules.forEach(function (r) {
          return rules.push(r);
        });
        return 'continue';
      }
    };

    for (var key in styles) {
      var _ret = _loop(key);

      if (_ret === 'continue') continue;
    }

    rules.unshift((0, _generateCSSRule2.default)(selector, decs.join(';')));

    return {
      rules: rules,
      media: media
    };
  };

  renderer._renderStyleToClassNames = function (style) {
    if (!Object.keys(style).length) {
      return '';
    }

    var className = generateClassName(style, renderer.selectorPrefix || 'fela-');
    var selector = (0, _generateCSSSelector2.default)(className);

    if (renderer.cache[className]) return ' ' + className;

    var _renderer$_parseMonol = renderer._parseMonolithicRules(selector, style),
        rules = _renderer$_parseMonol.rules,
        media = _renderer$_parseMonol.media;

    var cssRules = rules.join('');

    if (!renderer.cache[className]) {
      renderer.cache[className] = '';
    }

    if (rules.length) {
      renderer.rules += cssRules;
      renderer.cache[className] += cssRules;

      renderer._emitChange({
        selector: selector,
        declaration: cssRules,
        type: _styleTypes.RULE_TYPE
      });
    }
    if (media.length) {
      media.forEach(function (r) {
        var mediaKey = r.media;
        var mediaRules = r.rules.join('');
        if (!renderer.mediaRules.hasOwnProperty(mediaKey)) {
          renderer.mediaRules[mediaKey] = '';
        }
        renderer.mediaRules[mediaKey] += mediaRules;
        renderer.cache[className] += (0, _cssifyMediaQueryRules2.default)(mediaKey, mediaRules);

        renderer._emitChange({
          selector: selector,
          declaration: mediaRules,
          media: mediaKey,
          type: _styleTypes.RULE_TYPE
        });
      });
    }

    return ' ' + className;
  };

  return renderer;
}

function monolithic() {
  return useMonolithicRenderer;
}
module.exports = exports['default'];