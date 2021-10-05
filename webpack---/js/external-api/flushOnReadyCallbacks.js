"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flushOnReadyCallbacks = flushOnReadyCallbacks;

var _constants = require("./constants");

function flushOnReadyCallbacks(_ref) {
    var logger = _ref.logger,
        trackCallback = _ref.trackCallback;
    var callbacks = window[_constants.ON_READY_CALLBACKS];

    if (Array.isArray(callbacks)) {
        if (trackCallback) trackCallback();
        callbacks.forEach(function(cb) {
            try {
                cb();
            } catch (err) {
                logger.error(err.message);
            }
        });
    }
}