"use strict";
'use es6'; // From hub-http

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.triggerEvent = triggerEvent;
exports.EVENTS = void 0;

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

var EVENT_NAMESPACE = 'hubspot:messages:';

function triggerEvent(eventName, data) {
    var event;
    var namespacedName = "" + EVENT_NAMESPACE + eventName;

    if (typeof window.Event === 'function') {
        event = _extends(new Event(namespacedName), data);
    } else {
        event = _extends(document.createEvent('Event'), data);
        event.initEvent(namespacedName, true, true);
    }

    window.dispatchEvent(event);
}

var EVENTS = {
    messagesInitialized: function messagesInitialized(_ref) {
        var messageWillRender = _ref.messageWillRender,
            reason = _ref.reason;
        triggerEvent('initialized', {
            messageWillRender: messageWillRender,
            reason: reason
        });
    }
};
exports.EVENTS = EVENTS;