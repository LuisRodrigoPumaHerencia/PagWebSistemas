"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPageHeight = void 0;

var getPageHeight = function getPageHeight() {
    return Math.max(document.body.offsetHeight, document.body.scrollHeight);
};

exports.getPageHeight = getPageHeight;