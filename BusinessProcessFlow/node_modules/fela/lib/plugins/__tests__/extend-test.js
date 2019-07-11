'use strict';

var _extend = require('../extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Extend plugin', function () {
  it('should extend style objects', function () {
    var extension = { backgroundColor: 'blue' };
    var base = {
      color: 'blue',
      extend: extension
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue'
    });
  });

  it('should extend nested style objects', function () {
    var extension = { backgroundColor: 'blue' };
    var base = {
      color: 'blue',
      ':hover': {
        color: 'red',
        extend: extension
      }
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      ':hover': {
        color: 'red',
        backgroundColor: 'blue'
      }
    });
  });

  it('should extend conditional style object', function () {
    var extension = { backgroundColor: 'blue' };
    var base = {
      color: 'blue',
      extend: {
        condition: true,
        style: extension
      }
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue'
    });
  });

  it('should not extend conditional style object', function () {
    var extension = { backgroundColor: 'blue' };
    var base = {
      color: 'blue',
      extend: {
        condition: false,
        style: extension
      }
    };

    expect((0, _extend2.default)()(base)).toEqual({ color: 'blue' });
  });

  it('should extend multiple style objects', function () {
    var extension = { backgroundColor: 'blue' };
    var otherExtension = { fontSize: '12px' };

    var base = {
      color: 'blue',
      extend: [extension, otherExtension]
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px'
    });
  });

  it('should extend multiple style objects and conditional style objects', function () {
    var extension = { backgroundColor: 'blue' };
    var otherExtension = { fontSize: '12px' };

    var base = {
      color: 'blue',
      extend: [extension, {
        condition: true,
        style: otherExtension
      }]
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue',
      fontSize: '12px'
    });
  });

  it('should extend multiple style objects but not conditional style objects', function () {
    var extension = { backgroundColor: 'blue' };
    var otherExtension = { fontSize: '12px' };

    var base = {
      color: 'blue',
      extend: [extension, {
        condition: false,
        style: otherExtension
      }]
    };

    expect((0, _extend2.default)()(base)).toEqual({
      color: 'blue',
      backgroundColor: 'blue'
    });
  });
});