'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkFontFormat;

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

var _isBase = require('./isBase64');

var _isBase2 = _interopRequireDefault(_isBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formats = {
  '.woff': 'woff',
  '.eot': 'eot',
  '.ttf': 'truetype',
  '.svg': 'svg'
};

var base64Formats = {
  'image/svg+xml': 'svg',
  'application/x-font-woff': 'woff',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
  'application/font-woff2': 'woff2',
  'font/woff2': 'woff2',
  'application/octet-stream': 'ttf',
  'application/x-font-ttf': 'ttf',
  'application/x-font-truetype': 'ttf',
  'application/x-font-opentype': 'otf',
  'application/vnd.ms-fontobject': 'eot',
  'application/font-sfnt': 'sfnt'
};

var extensions = Object.keys(formats);
var base64MimeTypes = Object.keys(base64Formats);

function checkFontFormat(src) {
  for (var i = 0, len = extensions.length; i < len; ++i) {
    var extension = extensions[i];
    if (src.indexOf(extension) !== -1) {
      return formats[extension];
    }
  }

  if ((0, _isBase2.default)(src)) {
    for (var _i = 0, _len = base64MimeTypes.length; _i < _len; ++_i) {
      var mimeType = base64MimeTypes[_i];
      if (src.indexOf(mimeType) !== -1) {
        return base64Formats[mimeType];
      }
    }

    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(true, 'A invalid base64 font was used. Please use one of the following mime type: ' + Object.keys(base64Formats).join(', ') + '.') : void 0;
  } else {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(true, 'A invalid font-format was used in "' + src + '". Use one of these: ' + Object.keys(formats).join(', ') + '.') : void 0;
  }
  return '';
}
module.exports = exports['default'];