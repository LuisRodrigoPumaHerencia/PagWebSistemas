"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cookieValues = exports.cookies = void 0;
var cookies = {
    HUBSPOT: 'hubspotutk',
    MESSAGES: 'messagesUtk',
    IS_OPEN: 'hs-messages-is-open',
    HIDE_WELCOME_MESSAGE: 'hs-messages-hide-welcome-message',
    HUBSPOT_API_CSRF: 'hubspotapi-csrf',
    HSTC: '__hstc',
    HSSC: '__hssc',
    GLOBAL_COOKIE_OPT_OUT: '__hs_opt_out'
};
exports.cookies = cookies;
var cookieValues = {
    GLOBAL_COOKIE_OPT_OUT_YES: 'yes',
    GLOBAL_COOKIE_OPT_OUT_NO: 'no'
};
exports.cookieValues = cookieValues;