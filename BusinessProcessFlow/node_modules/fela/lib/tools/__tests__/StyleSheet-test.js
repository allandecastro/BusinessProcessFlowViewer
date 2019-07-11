'use strict';

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Creating a StyleSheet', function () {
  it('should generate rules of plain style objects', function () {
    var styles = _StyleSheet2.default.create({
      foo: { color: 'blue' },
      bar: function bar(props) {
        return { color: props.color };
      }
    });

    expect(styles.foo).toBeInstanceOf(Function);
    expect(styles.bar).toBeInstanceOf(Function);
    expect(styles.foo()).toEqual({ color: 'blue' });
    expect(styles.bar({ color: 'red' })).toEqual({ color: 'red' });
  });
});