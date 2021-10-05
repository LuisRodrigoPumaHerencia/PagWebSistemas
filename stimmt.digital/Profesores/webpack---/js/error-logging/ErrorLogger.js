"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ErrorLogger = void 0;

var _safeLog = require("../utils/safeLog");

var _computeStackTrace = require("./computeStackTrace");

var _envGetters = require("../embed-script-context/envGetters");

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

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

var URL = 'https://exceptions.hubspot.com/api/1/store/?sentry_key=7ab6425e7a7c4b01b71fdb51e76514bf&sentry_version=7';
var XHR_DONE_STATE = 4;

function getTimestampWithMS() {
    return Date.now() / 1000;
} // copy of sentry's uuid generator
// https://github.com/getsentry/sentry-javascript/blob/a01b4ee7f7ba03167d7424daae2fb2f2206687cb/packages/raven-js/src/utils.js#L261-L301


function uuid4() {
    var crypto = window.crypto || window.msCrypto;

    if (typeof crypto !== undefined && crypto.getRandomValues) {
        // Use window.crypto API if available
        var arr = new Uint16Array(8);
        crypto.getRandomValues(arr); // set 4 in byte 7

        arr[3] = arr[3] & 0xfff | 0x4000; // set 2 most significant bits of byte 9 to '10'

        arr[4] = arr[4] & 0x3fff | 0x8000;

        var pad = function pad(num) {
            var v = num.toString(16);

            while (v.length < 4) {
                v = "0" + v;
            }

            return v;
        };

        return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
    } else {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
}

function logSentryError(data) {
    var request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
        if (request.readyState !== XHR_DONE_STATE) {
            return;
        }

        if (request.status >= 300) {
            (0, _safeLog.warn)('Failed logging HSConversations error');
        }
    });
    request.open('POST', URL);
    request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    request.send(JSON.stringify(data));
}

var ErrorLogger = /*#__PURE__*/ function() {
    function ErrorLogger() {
        _classCallCheck(this, ErrorLogger);

        this.config = {
            environment: (0, _envGetters.getMessagesEnv)(),
            tags: {
                portalId: (0, _envGetters.getPortalId)(),
                env: (0, _envGetters.getMessagesEnv)()
            },
            logger: 'javascript',
            platform: 'javascript',
            request: {
                headers: {
                    'User-Agent': navigator.userAgent
                },
                url: window.location.href
            }
        };
        this.logError = this.logError.bind(this);
    }

    _createClass(ErrorLogger, [{
        key: "logError",
        value: function logError(message) {
            var timestamp = getTimestampWithMS();
            logSentryError(_extends({}, this.config, {
                event_id: uuid4(),
                transaction: 'conversations embed error',
                level: 'error',
                exception: {
                    values: [{
                        mechanism: {
                            handled: true,
                            type: 'generic'
                        },
                        type: message,
                        value: message
                    }]
                },
                timestamp: timestamp
            }));
        }
    }, {
        key: "captureErrors",
        value: function captureErrors(closure) {
            try {
                closure();
            } catch (error) {
                var timestamp = getTimestampWithMS();

                if (error.message !== 'Aborting: redirection in progress') {
                    var stacktrace = (0, _computeStackTrace.computeStackTrace)(error);
                    logSentryError(_extends({}, this.config, {
                        event_id: uuid4(),
                        transaction: stacktrace.stack[0].filename,
                        level: 'error',
                        exception: {
                            values: [{
                                mechanism: {
                                    handled: true,
                                    type: 'generic'
                                },
                                type: stacktrace.name,
                                value: stacktrace.message,
                                stacktrace: {
                                    frames: stacktrace.stack.reverse()
                                }
                            }]
                        },
                        timestamp: timestamp
                    }));
                }

                throw error;
            }
        }
    }]);

    return ErrorLogger;
}();

exports.ErrorLogger = ErrorLogger;