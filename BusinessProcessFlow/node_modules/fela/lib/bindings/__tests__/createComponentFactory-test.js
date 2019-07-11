'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createComponentFactory = require('../createComponentFactory');

var _createComponentFactory2 = _interopRequireDefault(_createComponentFactory);

var _createRenderer = require('../../createRenderer');

var _createRenderer2 = _interopRequireDefault(_createRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createComponent = (0, _createComponentFactory2.default)(_react.createElement, {
  renderer: _propTypes2.default.object,
  theme: _propTypes2.default.object
});

describe('Creating Components from Fela rules', function () {
  it('should return a Component', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: 16
      };
    };
    var component = createComponent(rule);

    expect(component).toBeInstanceOf(Function);
  });

  it('should render fela rules depending on the passed props', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: 16
      };
    };
    var component = createComponent(rule);

    var renderer = (0, _createRenderer2.default)();

    var element = component({ color: 'black' }, { renderer: renderer });

    expect(element.type).toEqual('div');

    expect(element.props.className).toEqual('a b');
    expect(renderer.rules).toEqual('.a{color:black}.b{font-size:16}');
  });

  it('should use the theme for static rendering by default', function () {
    var rule = function rule(props) {
      return {
        color: props.theme.color,
        fontSize: 16
      };
    };
    var component = createComponent(rule);
    var renderer = (0, _createRenderer2.default)();

    var element = component({}, {
      renderer: renderer,
      theme: { color: 'red' }
    });

    expect(element.type).toEqual('div');

    expect(element.props.className).toEqual('a b');
    expect(renderer.rules).toEqual('.a{color:red}.b{font-size:16}');
  });

  it('should only pass explicit props to the element', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: 16
      };
    };
    var component = createComponent(rule, 'div', ['onClick']);

    var renderer = (0, _createRenderer2.default)();

    var element = component({
      onClick: false,
      onHover: true
    }, { renderer: renderer });

    expect(element.props.onClick).toEqual(false);
    expect(element.props.onHover).toEqual(undefined);
  });

  it('should pass all props to the element', function () {
    var rule = function rule(props) {
      return {
        color: props.color,
        fontSize: 16
      };
    };
    var component = createComponent(rule, 'div', function (props) {
      return props;
    });

    var renderer = (0, _createRenderer2.default)();

    var element = component({
      onClick: false,
      onHover: true
    }, { renderer: renderer });

    expect(element.props.onClick).toEqual(false);
    expect(element.props.onHover).not.toEqual(undefined);
  });

  it('should only use passed props to render Fela rules', function () {
    var rule = function rule(props) {
      return {
        color: props.foo && props.color,
        fontSize: '16px'
      };
    };
    var component = createComponent(rule, 'div', ['foo']);

    var renderer = (0, _createRenderer2.default)();

    var element = component({
      foo: true,
      color: 'black'
    }, { renderer: renderer });

    expect(element.props.foo).toEqual(true);
    expect(renderer.rules).toEqual('.a{color:black}.b{font-size:16px}');
  });

  it('should compose styles', function () {
    var rule = function rule() {
      return {
        color: 'blue',
        fontSize: '16px'
      };
    };

    var anotherRule = function anotherRule() {
      return {
        color: 'red',
        lineHeight: 1.2
      };
    };

    var Comp = createComponent(rule);
    var ComposedComp = createComponent(anotherRule, Comp);

    var renderer = (0, _createRenderer2.default)();

    var element = ComposedComp({}, { renderer: renderer });
    var renderedElement = element.type(element.props, { renderer: renderer });

    expect(renderer.rules).toEqual('.a{color:red}.b{font-size:16px}.c{line-height:1.2}');
    expect(renderedElement.props.className).toEqual('a b c');
  });

  it('should compose passThrough props', function () {
    var component = createComponent(function () {
      return {};
    }, 'div', function (props) {
      return props;
    });
    var composedComponent = createComponent(function () {
      return {};
    }, component, ['onClick']);

    var renderer = (0, _createRenderer2.default)();

    var onClick = function onClick() {
      return true;
    };
    var element = composedComponent({ color: 'red' }, { renderer: renderer });
    var renderedElement = element.type(_extends({}, element.props, {
      onClick: onClick
    }), { renderer: renderer });

    expect(renderedElement.props.color).toEqual('red');
    expect(renderedElement.props.onClick).toEqual(onClick);
  });

  it('should only use the rule name as displayName', function () {
    var Button = function Button() {
      return {
        color: 'red',
        fontSize: 16
      };
    };
    var component = createComponent(Button);

    expect(component.displayName).toEqual('Button');
  });

  it('should only use the rule name as displayName', function () {
    var Button = function Button() {
      return {
        color: 'red',
        fontSize: 16
      };
    };
    var component = createComponent(Button);
    var renderer = (0, _createRenderer2.default)();
    var buttonInstance = component({ is: 'button' }, { renderer: renderer });

    expect(buttonInstance.type).toEqual('button');
  });
});