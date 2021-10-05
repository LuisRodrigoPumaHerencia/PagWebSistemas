"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.numberInvariant = void 0;

var _invariant = _interopRequireDefault(require("../utils/invariant"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var numberInvariant = function numberInvariant(potentialNumber) {
    var numberName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return (0, _invariant.default)(typeof potentialNumber === 'number', 'Expected %s to be a number, not a %s', numberName || potentialNumber, typeof potentialNumber);
};

exports.numberInvariant = numberInvariant;