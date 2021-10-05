"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBodyScrollTop = void 0;

var getBodyScrollTop = function getBodyScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
};

exports.getBodyScrollTop = getBodyScrollTop;