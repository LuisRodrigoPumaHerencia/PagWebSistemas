"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerWindowResizeListener = void 0;

var registerWindowResizeListener = function registerWindowResizeListener(_ref) {
    var resizeCallbackFn = _ref.resizeCallbackFn;
    window.addEventListener('resize', resizeCallbackFn, {
        passive: true
    });
};

exports.registerWindowResizeListener = registerWindowResizeListener;