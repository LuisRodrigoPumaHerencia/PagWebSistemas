"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDelayLoadingWidgetIframe = void 0;

var getDelayLoadingWidgetIframe = function getDelayLoadingWidgetIframe(widgetData, mobile) {
    var message = widgetData.message;
    var popOpenWelcomeMessage = message.popOpenWelcomeMessage,
        popOpenWidget = message.popOpenWidget,
        popMessageOnSmallScreens = message.popMessageOnSmallScreens,
        clientTriggers = message.clientTriggers;
    var displayOnTimeDelay = clientTriggers.displayOnTimeDelay;
    var enabled = displayOnTimeDelay.enabled,
        timeDelaySeconds = displayOnTimeDelay.timeDelaySeconds;
    var timeDelay = timeDelaySeconds * 1000;

    if (mobile) {
        return {
            shouldDelayLoadingIframe: !popMessageOnSmallScreens && enabled,
            timeDelay: timeDelay
        };
    }

    return {
        shouldDelayLoadingIframe: !popOpenWidget && !popOpenWelcomeMessage && enabled,
        timeDelay: timeDelay
    };
};

exports.getDelayLoadingWidgetIframe = getDelayLoadingWidgetIframe;