"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepareVisitorIdentifiers = void 0;

var _chooseMessagesUtk2 = require("./chooseMessagesUtk");

var _getMessagesUtkFromCookie = require("./getMessagesUtkFromCookie");

var _getHubSpotUtkFromCookie = require("./getHubSpotUtkFromCookie");

var _getGlobalCookieOptOut = require("./getGlobalCookieOptOut");

var _getHstcFromCookie = require("../utils/getHstcFromCookie");

var _getHsscFromCookie = require("../utils/getHsscFromCookie");

var _setMessagesUtk = require("./setMessagesUtk");

var prepareVisitorIdentifiers = function prepareVisitorIdentifiers() {
    /**
     * We check for a `messagesUtk` cookie
     * If it's present AND a uuid, use it
     * If not, store it in memory and wait for the visitor-ui to prompt
     * the shell to set it to a cookie
     */
    var existingMessagesUtk = (0, _getMessagesUtkFromCookie.getMessagesUtkFromCookie)();

    if (existingMessagesUtk) {
        /**
         * If there is already a messagesUtk cookie value, reset the cookie
         * to ensure it has the proper expiry (13 months)
         */
        (0, _setMessagesUtk.setMessagesUtk)(existingMessagesUtk);
    }
    /**
     * The analytics script drops a `hubspotUtk` cookie
     * If GDPR is enabled and consent has not been given,
     * it may not be present
     */


    var hubspotUtk = (0, _getHubSpotUtkFromCookie.getHubSpotUtkFromCookie)();
    var hstc = (0, _getHstcFromCookie.getHstcFromCookie)();
    var hssc = (0, _getHsscFromCookie.getHsscFromCookie)();
    var globalCookieOptOut = (0, _getGlobalCookieOptOut.getGlobalCookieOptOut)();

    var _chooseMessagesUtk = (0, _chooseMessagesUtk2.chooseMessagesUtk)({
            existingMessagesUtk: existingMessagesUtk
        }),
        messagesUtk = _chooseMessagesUtk.messagesUtk,
        isFirstVisitorSession = _chooseMessagesUtk.isFirstVisitorSession;

    return {
        messagesUtk: messagesUtk,
        hubspotUtk: hubspotUtk,
        hstc: hstc,
        hssc: hssc,
        globalCookieOptOut: globalCookieOptOut,
        isFirstVisitorSession: isFirstVisitorSession
    };
};

exports.prepareVisitorIdentifiers = prepareVisitorIdentifiers;