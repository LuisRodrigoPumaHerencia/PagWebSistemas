"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _stringInvariant = require("../invariants/stringInvariant");

var _functionInvariant = require("../invariants/functionInvariant");

var _eventEmitterConstants = require("./constants/eventEmitterConstants");

var _eventTypeInvariant = require("./invariants/eventTypeInvariant");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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

var EventEmitter = /*#__PURE__*/ function() {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._eventEmitter = new _eventemitter.default();
        this._namespacedEventType = this._namespacedEventType.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    _createClass(EventEmitter, [{
        key: "_namespacedEventType",
        value: function _namespacedEventType(rawEventType) {
            return _eventEmitterConstants.EVENT_NAMESPACE + ":" + rawEventType;
        }
        /*
         * Proxy of https://nodejs.org/api/events.html#events_emitter_addlistener_eventname_listener
         * @param {string} rawEventType - Name of the event to listen for
         * @param {function} listener - Function to be called when the event is triggered
         */

    }, {
        key: "on",
        value: function on(rawEventType, listener) {
            (0, _stringInvariant.stringInvariant)(rawEventType);
            (0, _functionInvariant.functionInvariant)(listener);

            if (!rawEventType.length) {
                return;
            }

            var eventType = this._namespacedEventType(rawEventType);

            this._eventEmitter.addListener(eventType, listener);
        }
        /*
         * Proxy of https://nodejs.org/api/events.html#events_emitter_removelistener_eventname_listener
         * @param {string} rawEventType - Name of the event for which the listener will be removed
         * @param {function} listener - The listener to remove
         */

    }, {
        key: "off",
        value: function off(rawEventType, listener) {
            (0, _stringInvariant.stringInvariant)(rawEventType);
            (0, _functionInvariant.functionInvariant)(listener);

            if (!rawEventType.length) {
                return;
            }

            var eventType = this._namespacedEventType(rawEventType);

            this._eventEmitter.removeListener(eventType, listener);
        }
        /*
         * Proxy of https://nodejs.org/api/events.html#events_emitter_emit_eventname_args
         * @param {string} rawEventType - Name of the event to be triggered
         * @param {object} [payload] - Data to be sent with the event
         */

    }, {
        key: "trigger",
        value: function trigger(rawEventType, payload) {
            (0, _eventTypeInvariant.eventTypeInvariant)(rawEventType);

            var eventType = this._namespacedEventType(rawEventType);

            this._eventEmitter.emit(eventType, payload);
        }
    }]);

    return EventEmitter;
}();

var _default = EventEmitter;
exports.default = _default;
module.exports = exports.default;