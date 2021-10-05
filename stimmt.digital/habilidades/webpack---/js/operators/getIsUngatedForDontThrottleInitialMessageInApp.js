"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIsUngatedForDontThrottleInitialMessageInApp = void 0;

var getIsUngatedForDontThrottleInitialMessageInApp = function getIsUngatedForDontThrottleInitialMessageInApp(widgetData) {
    return widgetData && widgetData.gates && widgetData.gates['Conversations:Visitor:DontThrottleInitialMessageWhileInApp'];
};

exports.getIsUngatedForDontThrottleInitialMessageInApp = getIsUngatedForDontThrottleInitialMessageInApp;