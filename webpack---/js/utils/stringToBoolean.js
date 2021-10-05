"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stringToBoolean = void 0;

var stringToBoolean = function stringToBoolean(stringValue) {
    if (stringValue === 'true') {
        return true;
    }

    return false;
};

exports.stringToBoolean = stringToBoolean;