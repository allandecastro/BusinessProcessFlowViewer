'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connectFactory;

var _generateDisplayName = require('./generateDisplayName');

var _generateDisplayName2 = _interopRequireDefault(_generateDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connectFactory(BaseComponent, createElement, contextTypes) {
  return function connect(mapStylesToProps) {
    return function (component) {
      var EnhancedComponent = function (_BaseComponent) {
        _inherits(EnhancedComponent, _BaseComponent);

        function EnhancedComponent() {
          _classCallCheck(this, EnhancedComponent);

          return _possibleConstructorReturn(this, (EnhancedComponent.__proto__ || Object.getPrototypeOf(EnhancedComponent)).apply(this, arguments));
        }

        _createClass(EnhancedComponent, [{
          key: 'render',
          value: function render() {
            var _context = this.context,
                renderer = _context.renderer,
                theme = _context.theme;


            var styles = mapStylesToProps(_extends({}, this.props, {
              theme: theme || {}
            }))(renderer);

            return createElement(component, _extends({}, this.props, {
              styles: styles
            }));
          }
        }]);

        return EnhancedComponent;
      }(BaseComponent);

      EnhancedComponent.displayName = (0, _generateDisplayName2.default)(component);


      if (contextTypes) {
        EnhancedComponent.contextTypes = _extends({}, component.contextTypes, contextTypes);
      }

      return EnhancedComponent;
    };
  };
}
module.exports = exports['default'];