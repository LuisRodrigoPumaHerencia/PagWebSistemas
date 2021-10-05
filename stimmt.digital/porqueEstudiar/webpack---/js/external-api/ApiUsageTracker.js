"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ApiUsageTracker = void 0;

var _sentPostMessageTypes = require("../iframe-communication/constants/sentPostMessageTypes");

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

var ApiUsageTracker = /*#__PURE__*/ function() {
    function ApiUsageTracker(_ref) {
        var postMessageToIframe = _ref.postMessageToIframe;

        _classCallCheck(this, ApiUsageTracker);

        if (typeof postMessageToIframe !== 'function') {
            throw new TypeError('ApiUsageTracker: postMessageToIframe was not a function');
        }

        this._postMessageToIframe = postMessageToIframe;
        this.sendEventToTracker = this.sendEventToTracker.bind(this);
        this.trackSettingsUsed = this.trackSettingsUsed.bind(this);
        this.trackMethod = this.trackMethod.bind(this);
        this.trackEventListener = this.trackEventListener.bind(this);
        this.trackOnReady = this.trackOnReady.bind(this);
    }

    _createClass(ApiUsageTracker, [{
        key: "sendEventToTracker",
        value: function sendEventToTracker(eventName) {
            var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            this._postMessageToIframe(_sentPostMessageTypes.TRACK_API_USAGE, {
                eventName: eventName,
                properties: properties
            });
        }
    }, {
        key: "trackSettingsUsed",
        value: function trackSettingsUsed(externalApiSettings) {
            var settingsUsed = {};

            if (externalApiSettings.loadImmediately === false) {
                settingsUsed.loadImmediately = true;
            }

            if (externalApiSettings.inlineEmbedSelector) {
                settingsUsed.inlineEmbedSelector = true;
            }

            if (externalApiSettings.enableWidgetCookieBanner) {
                settingsUsed.enableWidgetCookieBanner = true;
            }

            if (externalApiSettings.disableAttachment) {
                settingsUsed.disableAttachment = true;
            }

            if (Object.keys(settingsUsed).length > 0) {
                this.sendEventToTracker('HubspotConversations-hsConversationsSettings-used', settingsUsed);
            }
        }
    }, {
        key: "trackMethod",
        value: function trackMethod(methodName) {
            this.sendEventToTracker('HubspotConversations-api-method-used', {
                method: methodName
            });
        }
    }, {
        key: "trackEventListener",
        value: function trackEventListener(eventName) {
            this.sendEventToTracker("HubspotConversations-api-event-listener-registered", {
                event: eventName
            });
        }
    }, {
        key: "trackOnReady",
        value: function trackOnReady() {
            this.sendEventToTracker('HubspotConversations-hsConversationsOnReady-used', {
                method: 'hsConversationsOnReady'
            });
        }
    }]);

    return ApiUsageTracker;
}();

exports.ApiUsageTracker = ApiUsageTracker;