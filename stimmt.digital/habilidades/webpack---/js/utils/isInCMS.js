"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isInCMS = void 0;

var isInCMS = function isInCMS() {
    return window.hsVars !== undefined;
};

exports.isInCMS = isInCMS;