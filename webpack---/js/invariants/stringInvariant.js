"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stringInvariant = void 0;

var _invariant = _interopRequireDefault(require("../utils/invariant"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var stringInvariant = function stringInvariant(potentialString) {
    var stringName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return (0, _invariant.default)(typeof potentialString === 'string', 'Expected %s to be a string, not a %s', stringName || potentialString, typeof potentialString);
};

exports.stringInvariant = stringInvariant;