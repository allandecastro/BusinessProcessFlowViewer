'use strict';

var _createRenderer = require('../../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

var _monolithic = require('../monolithic');

var _monolithic2 = _interopRequireDefault(_monolithic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = { enhancers: [(0, _monolithic2.default)()] };

describe('Monolithic enhancer', function () {
  it('should add a cache entry', function () {
    var rule = function rule() {
      return { color: 'red' };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(renderer.cache.hasOwnProperty(className)).toEqual(true);
  });

  it('should reuse classNames', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: '23px'
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className1 = renderer.renderRule(rule, { color: 'red' });
    var className2 = renderer.renderRule(rule, { color: 'red' });

    expect(className1).toEqual(className2);
  });

  it('should return an empty string if the style is empty', function () {
    var rule = function rule() {
      return {};
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(className).toEqual('');
  });

  it('should remove undefined values', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: '15px'
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{font-size:15px}');
  });

  it('should allow nested props', function () {
    var rule = function rule(props) {
      return {
        color: props.theme.color,
        fontSize: 15
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule, { theme: { color: 'red' } });

    expect(renderer.rules).toEqual('.' + className + '{color:red;font-size:15}');
  });

  it('should render pseudo classes', function () {
    var rule = function rule() {
      return {
        color: 'red',
        ':hover': { color: 'blue' }
      };
    };

    var renderer = (0, _createRenderer2.default)(options);
    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}.' + className + ':hover{color:blue}');
  });

  it('should prefix classNames', function () {
    var rule = function rule() {
      return { color: 'red' };
    };

    var renderer = (0, _createRenderer2.default)({ selectorPrefix: 'fela_' });
    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}');
    expect(className).toContain('fela_');
  });

  it('should render attribute selectors', function () {
    var rule = function rule() {
      return {
        color: 'red',
        '[bool=true]': { color: 'blue' }
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}.' + className + '[bool=true]{color:blue}');
  });

  it('should render child selectors', function () {
    var rule = function rule() {
      return {
        color: 'red',
        '>div': { color: 'blue' }
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}.' + className + '>div{color:blue}');
  });

  it('should render any nested selector with the &-prefix', function () {
    var rule = function rule() {
      return {
        color: 'red',
        '&~#foo': { color: 'blue' },
        '& .bar': { color: 'green' }
      };
    };
    var renderer = (0, _createRenderer2.default)(options);

    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}.' + className + '~#foo{color:blue}.' + className + ' .bar{color:green}');
  });

  it('should render media queries', function () {
    var rule = function rule() {
      return {
        color: 'red',
        '@media (min-height:300px)': { color: 'blue' }
      };
    };

    var renderer = (0, _createRenderer2.default)(options);
    var className = renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.' + className + '{color:red}');
    expect(renderer.mediaRules['(min-height:300px)']).toEqual('.' + className + '{color:blue}');
  });

  it('should use custom className if defined', function () {
    var rule = function rule() {
      return {
        className: 'custom',
        color: 'red'
      };
    };

    var renderer = (0, _createRenderer2.default)(options);
    renderer.renderRule(rule);

    expect(renderer.rules).toEqual('.fela-custom{color:red}');
  });

  it('should create different classNames for different styles', function () {
    var rule1 = function rule1() {
      return {
        className: 'custom',
        color: 'red'
      };
    };
    var rule2 = function rule2() {
      return {
        className: 'custom',
        color: 'green'
      };
    };
    var renderer = (0, _createRenderer2.default)(options);
    var className1 = renderer.renderRule(rule1);
    var className2 = renderer.renderRule(rule2);

    expect(className1).not.toBe(className2);
  });
});