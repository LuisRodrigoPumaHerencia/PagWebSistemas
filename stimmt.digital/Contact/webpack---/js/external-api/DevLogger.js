"use strict";

/* eslint-disable no-console */
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var LOGGING_PREFIX = 'HubSpot Conversations log:';

var DevLogger = /*#__PURE__*/ function() {
    function DevLogger() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            debug = _ref.debug;

        _classCallCheck(this, DevLogger);

        this._debug = Boolean(debug);
        this.debug = this.debug.bind(this);
    }

    _createClass(DevLogger, [{
        key: "_isDebugMode",
        value: function _isDebugMode() {
            return this._debug;
        }
        /*
         * Toggles the logger's debug mode
         * @param {boolean} debugMode - whether to turn debug on or off
         */

    }, {
        key: "debug",
        value: function debug(debugMode) {
            this._debug = debugMode;
        }
        /*
         * Log a message if in debug mode
         * @param {string} message - the message to log
         */

    }, {
        key: "log",
        value: function log(message) {
            if (!this._isDebugMode()) {
                return;
            }

            console.log(LOGGING_PREFIX + " " + message);
        }
        /*
         * Log an error if in debug mode
         * @param {string} message - the error to log
         */

    }, {
        key: "error",
        value: function error(message) {
            if (!this._isDebugMode()) {
                return;
            }

            console.error(LOGGING_PREFIX + " " + message);
        }
    }]);

    return DevLogger;
}();

var _default = DevLogger;
exports.default = _default;
module.exports = exports.default;