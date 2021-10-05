"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostMessageReceiver = void 0;

var _stringInvariant = require("../invariants/stringInvariant");

var _objectInvariant = require("../invariants/objectInvariant");

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

/** Class that registers and invokes handlers for "message" events */
var PostMessageReceiver = /*#__PURE__*/ function() {
    /**
     * Create a post message handler
     * @param {Object} messageHandlers  - map of MessageEvent types to handlers
     * @param {Object} options - object to configure the handler at instantiation time
     * @param {string} options.allowedOrigin  - The only origin from which to accept message events
     * @param {string} options.iframeUuid - A uuid of the iframe that the embed script has rendered. This receiver
     *                                      will only handle messages that contain a matching uuid
     */
    function PostMessageReceiver(messageHandlers, _ref) {
        var allowedOrigin = _ref.allowedOrigin,
            iframeUuid = _ref.iframeUuid;

        _classCallCheck(this, PostMessageReceiver);

        (0, _objectInvariant.objectInvariant)(messageHandlers);
        (0, _stringInvariant.stringInvariant)(allowedOrigin);
        (0, _stringInvariant.stringInvariant)(iframeUuid);
        this.allowedOrigin = allowedOrigin;
        this.iframeUuid = iframeUuid;
        this._handlers = messageHandlers;
        this.handleMessage = this.handleMessage.bind(this);
        window.addEventListener('message', this.handleMessage);
    }
    /**
     * Determines whether a particular origin is allowed for incoming post message events
     * @param {string} origin - the origin to check
     * @return {boolean} Whether the origin is allowed or not
     */


    _createClass(PostMessageReceiver, [{
        key: "isOriginAllowed",
        value: function isOriginAllowed(origin) {
            return origin === this.allowedOrigin;
        }
        /**
         * Handles a message event
         * @param {MessageEvent} messageEvent - The message event to be handled
         */

    }, {
        key: "handleMessage",
        value: function handleMessage(messageEvent) {
            var rawData = messageEvent.data,
                origin = messageEvent.origin,
                source = messageEvent.source;

            if (!this.isOriginAllowed(origin)) {
                return;
            }

            try {
                var parsedData = JSON.parse(rawData);

                if (parsedData.uuid !== this.iframeUuid) {
                    return;
                }

                var type = parsedData.type,
                    data = parsedData.data;
                var handler = this._handlers[type];

                if (typeof handler === 'function') {
                    handler({
                        data: data,
                        source: source
                    });
                }
            } catch (e) {
                return;
            }
        }
    }, {
        key: "register",
        value: function register(type, method) {
            this._handlers[type] = method;
        }
    }]);

    return PostMessageReceiver;
}();

exports.PostMessageReceiver = PostMessageReceiver;