"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerCookieListeners = void 0;

var _sentPostMessageTypes = require("../iframe-communication/constants/sentPostMessageTypes");

var _constants = require("./constants");

var _deleteCookie = require("./deleteCookie");

var registerCookieListeners = function registerCookieListeners(_ref) {
    var postMessageToIframe = _ref.postMessageToIframe;

    var handlePrivacyConsent = function handlePrivacyConsent(consent) {
        var allowedMessagesUtkCookie = consent.categories ? consent.categories.functionality : consent.allowed;
        var globalCookieOptOut = allowedMessagesUtkCookie ? _constants.cookieValues.GLOBAL_COOKIE_OPT_OUT_NO : _constants.cookieValues.GLOBAL_COOKIE_OPT_OUT_YES;
        postMessageToIframe(_sentPostMessageTypes.GLOBAL_COOKIE_OPT_OUT, {
            globalCookieOptOut: globalCookieOptOut
        });

        if (!allowedMessagesUtkCookie) {
            (0, _deleteCookie.deleteCookie)(_constants.cookies.MESSAGES);
        }
    }; // https://git.hubteam.com/hubSpot/analytics_js#available-callbacks


    window._hsq = window._hsq || [];

    window._hsq.push(['addPrivacyConsentListener', handlePrivacyConsent]);

    window._hsq.push(['addUserTokenListener', function(utk) {
        return postMessageToIframe(_sentPostMessageTypes.HUBSPOT_UTK, {
            utk: utk
        });
    }]);
};

exports.registerCookieListeners = registerCookieListeners;