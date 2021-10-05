"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendWidgetDataToIframe = void 0;

var _getIsUngatedForDontThrottleInitialMessageInApp = require("../operators/getIsUngatedForDontThrottleInitialMessageInApp");

var _throttleInProductInitialMessagePopups = require("../utils/throttleInProductInitialMessagePopups");

var _getExternalApiSettings = require("../external-api/getExternalApiSettings");

var _getIframeQueryParams = require("../utils/getIframeQueryParams");

var _sentPostMessageTypes = require("../iframe-communication/constants/sentPostMessageTypes");

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

var sendWidgetDataToIframe = function sendWidgetDataToIframe(_ref) {
    var source = _ref.source,
        widgetData = _ref.widgetData,
        embedScriptContext = _ref.embedScriptContext,
        apiUsageTracker = _ref.apiUsageTracker;
    source.postMessage(JSON.stringify({
        type: _sentPostMessageTypes.WIDGET_DATA,
        data: _extends({}, widgetData, {}, (0, _getIframeQueryParams.getIframeQueryParams)(embedScriptContext))
    }), '*');
    if (!(0, _getIsUngatedForDontThrottleInitialMessageInApp.getIsUngatedForDontThrottleInitialMessageInApp)(widgetData))(0, _throttleInProductInitialMessagePopups.throttleInProductInitialMessagePopups)(embedScriptContext);
    apiUsageTracker.trackSettingsUsed((0, _getExternalApiSettings.getExternalApiSettings)());
};

exports.sendWidgetDataToIframe = sendWidgetDataToIframe;