"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIframeQueryParams = getIframeQueryParams;

var _operators = require("../cookies/operators");

var _whichDevice = require("./whichDevice");

var _isEmbeddedInProduct = require("./isEmbeddedInProduct");

var _shouldHideWelcomeMessage = require("./shouldHideWelcomeMessage");

var _shouldWidgetStartOpen = require("./shouldWidgetStartOpen");

var _settingsHelpers = require("../external-api/settingsHelpers");

function getIframeQueryParams(_ref) {
    var messagesUtk = _ref.messagesUtk,
        hubspotUtk = _ref.hubspotUtk,
        portalId = _ref.portalId,
        iframeUuid = _ref.iframeUuid,
        globalCookieOptOut = _ref.globalCookieOptOut,
        isFirstVisitorSession = _ref.isFirstVisitorSession,
        hstc = _ref.hstc,
        isInCMS = _ref.isInCMS;
    var mobile = (0, _whichDevice.isAnyMobile)();
    var inline = (0, _settingsHelpers.shouldEmbedInline)();
    var startOpen = (0, _shouldWidgetStartOpen.shouldWidgetStartOpen)();
    var queryParams = {
        uuid: iframeUuid,
        mobile: mobile,
        mobileSafari: (0, _whichDevice.isMobileSafari)(),
        hideWelcomeMessage: (0, _shouldHideWelcomeMessage.shouldHideWelcomeMessage)(),
        hstc: hstc,
        domain: (0, _operators.getHostnameWithoutWww)(),
        inApp53: (0, _isEmbeddedInProduct.isEmbeddedInProduct)({
            portalId: portalId
        }),
        messagesUtk: messagesUtk,
        url: encodeURIComponent(window.location.href),
        inline: inline,
        isFullscreen: (0, _settingsHelpers.shouldBeFullscreen)(),
        globalCookieOptOut: globalCookieOptOut,
        isFirstVisitorSession: isFirstVisitorSession,
        isAttachmentDisabled: (0, _settingsHelpers.shouldDisableAttachment)(),
        enableWidgetCookieBanner: (0, _settingsHelpers.getEnableWidgetCookieBanner)(),
        isInCMS: isInCMS
    };

    if (typeof startOpen !== 'undefined') {
        queryParams['startOpen'] = startOpen;
    }

    if (hubspotUtk) {
        queryParams['hubspotUtk'] = hubspotUtk;
    }

    return queryParams;
}