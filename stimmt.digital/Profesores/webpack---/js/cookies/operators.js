"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCookie = getCookie;
exports.getHostnameWithoutWww = getHostnameWithoutWww;
exports.setCookie = setCookie;

var _times = _interopRequireDefault(require("./times"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var hasWarnedAboutInsecureCookie = false;

function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        var currentCookies = document.cookie.split(';');

        for (var i = 0; i < currentCookies.length; i++) {
            var cookie = currentCookies[i].trim();

            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = cookie.substring(name.length + 1);
                break;
            }
        }
    }

    return cookieValue;
}

function getHostnameWithoutWww() {
    return window.location.hostname.replace(/^www\./, '');
}

function setCookie(name, value) {
    var expireIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _times.default.THIRTEEN_MONTHS;
    var expirationDate = new Date(Date.now() + expireIn).toGMTString();
    var hostnameWithoutWww = getHostnameWithoutWww();
    var domain = "." + hostnameWithoutWww;
    var cookieParams = [name + "=" + value, "expires=" + expirationDate, "domain=" + domain, 'path=/', 'SameSite=Lax'];

    if (window.location.protocol.indexOf('https') > -1) {
        cookieParams.push('Secure');
    } else if (!hasWarnedAboutInsecureCookie) {
        // eslint-disable-next-line no-console
        console.warn("HubSpot Conversations: You are using conversations on a non-https site! Not using https puts your visitor's data at risk, please enforce using https.");
        hasWarnedAboutInsecureCookie = true;
    }

    var cookie = cookieParams.join(';');
    document.cookie = cookie;
}