'use strict';

var _createRenderer = require('../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

var _styleTypes = require('../utils/styleTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Renderer', function () {
  describe('Instantiating a new renderer', function () {
    it('should add caches for all styles', function () {
      var renderer = (0, _createRenderer2.default)();

      expect(renderer.rules).toEqual('');
      expect(renderer.mediaRules).toEqual({});
      expect(renderer.keyframes).toEqual('');
      expect(renderer.fontFaces).toEqual('');
      expect(renderer.statics).toEqual('');
      expect(renderer.cache).toEqual({});
      expect(renderer.uniqueRuleIdentifier).toEqual(0);
      expect(renderer.uniqueKeyframeIdentifier).toEqual(0);
    });

    it('should apply enhancers directly', function () {
      var enhancer = function enhancer(renderer) {
        renderer.foo = 'bar';
        return renderer;
      };
      var renderer = (0, _createRenderer2.default)({ enhancers: [enhancer] });

      expect(renderer.foo).toEqual('bar');
    });

    it('should apply media queries in correct order', function () {
      var renderer = (0, _createRenderer2.default)({ mediaQueryOrder: ['(min-height: 300px)', '(max-width: 150px)'] });

      expect(renderer.mediaRules).toEqual({
        '(min-height: 300px)': '',
        '(max-width: 150px)': ''
      });
    });
  });

  describe('Clearing a Renderer', function () {
    it('should reset all caches', function () {
      var renderer = (0, _createRenderer2.default)();
      var rule = function rule() {
        return { color: 'red' };
      };

      renderer.renderRule(rule);
      renderer.clear();

      expect(renderer.rules).toEqual('');
      expect(renderer.mediaRules).toEqual({});
      expect(renderer.keyframes).toEqual('');
      expect(renderer.fontFaces).toEqual('');
      expect(renderer.statics).toEqual('');
      expect(renderer.cache).toEqual({});
      expect(renderer.uniqueRuleIdentifier).toEqual(0);
      expect(renderer.uniqueKeyframeIdentifier).toEqual(0);
    });
  });

  describe('Rendering rules', function () {
    it('should add a cache entry', function () {
      var rule = function rule() {
        return { color: 'red' };
      };
      var renderer = (0, _createRenderer2.default)();

      renderer.renderRule(rule);

      expect(renderer.cache.hasOwnProperty('colorred')).toEqual(true);
    });

    it('should reuse cached classNames', function () {
      var rule = function rule(props) {
        return {
          color: props.color,
          fontSize: '23px'
        };
      };
      var renderer = (0, _createRenderer2.default)();

      var className1 = renderer.renderRule(rule, { color: 'red' });
      var className2 = renderer.renderRule(rule, { color: 'red' });
      var className3 = renderer.renderRule(rule, { color: 'blue' });

      expect(className1).toEqual(className2);
      expect(className1).toEqual('a b');
      expect(className3).toEqual('c b');
    });

    it('should return an empty string if the style is empty', function () {
      var rule = function rule() {
        return {};
      };
      var renderer = (0, _createRenderer2.default)();

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
      var renderer = (0, _createRenderer2.default)();

      var className = renderer.renderRule(rule);

      expect(className).toEqual('a');
      expect(renderer.rules).toEqual('.a{font-size:15px}');
    });

    it('should allow nested props', function () {
      var rule = function rule(props) {
        return {
          color: props.theme.color,
          fontSize: 15
        };
      };
      var renderer = (0, _createRenderer2.default)();

      var className = renderer.renderRule(rule, { theme: { color: 'red' } });

      expect(className).toEqual('a b');
    });

    it('should render pseudo classes', function () {
      var rule = function rule() {
        return {
          color: 'red',
          ':hover': { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();
      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}.b:hover{color:blue}');
    });

    it('should prefix classNames', function () {
      var rule = function rule() {
        return { color: 'red' };
      };

      var renderer = (0, _createRenderer2.default)({ selectorPrefix: 'fela_' });
      var className = renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.fela_a{color:red}');
      expect(className).toEqual('fela_a');
    });

    it('should render attribute selectors', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '[bool=true]': { color: 'blue' }
        };
      };
      var renderer = (0, _createRenderer2.default)();

      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}.b[bool=true]{color:blue}');
    });

    it('should render child selectors', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '>div': { color: 'blue' }
        };
      };
      var renderer = (0, _createRenderer2.default)();

      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}.b>div{color:blue}');
    });

    it('should render pseudo class selectors', function () {
      var rule = function rule() {
        return {
          color: 'red',
          ':hover': { color: 'blue' }
        };
      };
      var renderer = (0, _createRenderer2.default)();

      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}.b:hover{color:blue}');
    });

    it('should render any nested selector with the &-prefix', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '&~#foo': { color: 'blue' },
          '& .bar': { color: 'green' }
        };
      };
      var renderer = (0, _createRenderer2.default)();

      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}.b~#foo{color:blue}.c .bar{color:green}');
    });

    it('should render media queries', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '@media (min-height:300px)': { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();
      renderer.renderRule(rule);

      expect(renderer.rules).toEqual('.a{color:red}');
      expect(renderer.mediaRules['(min-height:300px)']).toEqual('.b{color:blue}');
    });
  });

  describe('Rendering keyframes', function () {
    it('should add a cache entry', function () {
      var keyframe = function keyframe() {
        return {
          from: { color: 'red' },
          to: { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();

      renderer.renderKeyframe(keyframe);
      expect(renderer.cache.hasOwnProperty(JSON.stringify(keyframe()))).toEqual(true);
    });

    it('should return a valid animation name', function () {
      var keyframe = function keyframe() {
        return {
          from: { color: 'red' },
          to: { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();
      var animationName = renderer.renderKeyframe(keyframe);

      expect(animationName).toEqual('k1');
    });

    it('should render dynamic keyframe variations', function () {
      var keyframe = function keyframe(props) {
        return {
          from: { color: props.color },
          to: { color: 'blue' }
        };
      };
      var renderer = (0, _createRenderer2.default)();

      var animationName = renderer.renderKeyframe(keyframe, { color: 'red' });

      expect(animationName).toEqual('k1');
      expect(renderer.keyframes).toEqual('@-webkit-keyframes k1{from{color:red}to{color:blue}}@-moz-keyframes k1{from{color:red}to{color:blue}}@keyframes k1{from{color:red}to{color:blue}}');
    });
  });

  describe('Rendering static styles', function () {
    it('should cache the style and return the rendered markup', function () {
      var renderer = (0, _createRenderer2.default)();

      var staticStyle = '*{color:red;margin:0}';
      renderer.renderStatic(staticStyle);

      expect(renderer.cache.hasOwnProperty(staticStyle)).toEqual(true);
      expect(renderer.statics).toEqual(staticStyle);
    });

    it('should render a flat object of static selectors', function () {
      var renderer = (0, _createRenderer2.default)();

      var staticStyle = {
        margin: 0,
        fontSize: '12px'
      };

      renderer.renderStatic(staticStyle, 'html,body');
      expect(renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).toEqual(true);
      expect(renderer.statics).toEqual('html,body{margin:0;font-size:12px}');
    });

    it('should allow multiple static styles for a single selector', function () {
      var renderer = (0, _createRenderer2.default)();

      renderer.renderStatic({
        margin: 0,
        fontSize: '12px'
      }, 'html,body');
      renderer.renderStatic({ color: 'red' }, 'html,body');

      expect(renderer.cache.hasOwnProperty('html,body{"margin":0,"fontSize":"12px"}')).toEqual(true);
      expect(renderer.cache.hasOwnProperty('html,body{"color":"red"}')).toEqual(true);
      expect(renderer.statics).toEqual('html,body{margin:0;font-size:12px}html,body{color:red}');
    });
  });

  describe('Rendering Fonts', function () {
    it('should cache the font-face', function () {
      var renderer = (0, _createRenderer2.default)();
      var family = 'Arial';
      var properties = { fontWeight: 300 };

      renderer.renderFont(family, ['../fonts/Arial.ttf', '../fonts/Arial.woff'], properties);

      var key = family + JSON.stringify(properties);
      expect(renderer.cache.hasOwnProperty(key)).toEqual(true);
    });

    it('should return the font family', function () {
      var renderer = (0, _createRenderer2.default)();

      var family = renderer.renderFont('Arial', ['../fonts/Arial.ttf', '../fonts/Arial.woff'], { fontWeight: 300 });

      expect(family).toEqual('"Arial"');
    });
  });

  describe('Subscribing to the Renderer', function () {
    it('should call the callback each time it emits changes', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '@media (min-height: 300px)': { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();
      var subscriber = jest.fn();
      renderer.subscribe(subscriber);
      renderer.renderRule(rule);

      expect(subscriber).toHaveBeenCalledTimes(2);
    });

    it('should call the callback with a change object', function () {
      var rule = function rule() {
        return {
          color: 'red',
          '@media (min-height: 300px)': { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();

      var changes = [];
      var subscriber = function subscriber(change) {
        return changes.push(change);
      };

      renderer.subscribe(subscriber);
      renderer.renderRule(rule);

      expect(changes).toEqual([{
        type: _styleTypes.RULE_TYPE,
        selector: '.a',
        declaration: 'color:red',
        media: ''
      }, {
        type: _styleTypes.RULE_TYPE,
        selector: '.b',
        declaration: 'color:blue',
        media: '(min-height: 300px)'
      }]);
    });

    it('should return a unsubscribe method', function () {
      var renderer = (0, _createRenderer2.default)();
      var subscriber = function subscriber() {};

      var unsubscriber = renderer.subscribe(subscriber);
      unsubscriber.unsubscribe();

      expect(unsubscriber.unsubscribe).toBeInstanceOf(Function);
      expect(renderer.listeners.length).toEqual(0);
    });
  });

  describe('Rendering to string', function () {
    it('should return a single CSS string', function () {
      var rule = function rule(props) {
        return {
          color: props.color,
          '@media (min-height: 300px)': { color: 'blue' }
        };
      };

      var renderer = (0, _createRenderer2.default)();
      renderer.renderRule(rule, { color: 'red' });
      renderer.renderStatic('*{box-sizing:border-box}');
      renderer.renderStatic({ display: 'flex' }, 'div');

      expect(renderer.renderToString()).toEqual('*{box-sizing:border-box}div{display:flex}.a{color:red}@media (min-height: 300px){.b{color:blue}}');
    });
  });
});