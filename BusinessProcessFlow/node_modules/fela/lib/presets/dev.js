'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../plugins/logger');

var _logger2 = _interopRequireDefault(_logger);

var _validator = require('../plugins/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */
exports.default = [(0, _logger2.default)({ logMetaData: true }), (0, _validator2.default)()];
module.exports = exports['default'];