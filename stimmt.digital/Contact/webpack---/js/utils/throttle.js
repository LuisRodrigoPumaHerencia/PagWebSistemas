"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;

function throttle(func, timeout) {
    var throttled = false;
    var trailingCall = null;
    return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (throttled) {
            trailingCall = function trailingCall() {
                func.apply(void 0, args);
            };

            return;
        } else {
            throttled = true;
            func.apply(void 0, args);
            setTimeout(function() {
                throttled = false;

                if (typeof trailingCall === 'function') {
                    trailingCall();
                }

                trailingCall = null;
            }, timeout);
        }
    };
}