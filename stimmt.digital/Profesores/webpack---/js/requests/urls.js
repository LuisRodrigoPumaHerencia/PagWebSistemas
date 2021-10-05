"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInternalRequestUrl = getInternalRequestUrl;
exports.getCMSRequestUrl = getCMSRequestUrl;
exports.getPublicRequestUrl = getPublicRequestUrl;

var _legacyHubspotBenderContext = require("legacy-hubspot-bender-context");

var _getApiDomain = require("../utils/getApiDomain");

var _getPortalIdFromPath = require("../utils/getPortalIdFromPath");

var _whichDevice = require("../utils/whichDevice");

// import-eslint-disable-line
function getInternalRequestUrl(_ref) {
    var messagesEnv = _ref.messagesEnv,
        portalId = _ref.portalId,
        messagesUtk = _ref.messagesUtk,
        messagesHublet = _ref.messagesHublet;
    var usersPortalId = (0, _getPortalIdFromPath.getPortalIdFromPath)(window.location.pathname);
    return (0, _getApiDomain.getApiDomain)(messagesEnv, messagesHublet) + "/livechat/v1/message/public/hubspot-app?portalId=" + usersPortalId + "&mobile=" + (0, _whichDevice.isAnyMobile)() + "&embeddedPortalId=" + portalId + "&traceId=" + messagesUtk;
}

function buildRequestParams(_ref2) {
    var messagesUtk = _ref2.messagesUtk,
        hubspotUtk = _ref2.hubspotUtk,
        portalId = _ref2.portalId,
        referrer = _ref2.referrer,
        hstc = _ref2.hstc,
        hssc = _ref2.hssc,
        email = _ref2.email,
        identificationToken = _ref2.identificationToken;
    var requestUrl = "?portalId=" + portalId + "&" + _legacyHubspotBenderContext.bender.project + "=" + _legacyHubspotBenderContext.bender.depVersions[_legacyHubspotBenderContext.bender.project] + "&mobile=" + (0, _whichDevice.isAnyMobile)();

    if (messagesUtk) {
        requestUrl = requestUrl + "&messagesUtk=" + messagesUtk + "&traceId=" + messagesUtk;
    }

    if (hubspotUtk) {
        requestUrl = requestUrl + "&hubspotUtk=" + hubspotUtk;
    }

    if (hstc) {
        requestUrl = requestUrl + "&__hstc=" + hstc;
    }

    if (hssc) {
        requestUrl = requestUrl + "&__hssc=" + hssc;
    }

    if (referrer) {
        requestUrl = requestUrl + "&referrer=" + referrer;
    }

    if (identificationToken) {
        requestUrl = requestUrl + "&identificationToken=" + identificationToken;
    }

    if (email) {
        requestUrl = requestUrl + "&email=" + email;
    }

    return requestUrl;
}

function getCMSRequestUrl(_ref3) {
    var messagesUtk = _ref3.messagesUtk,
        hubspotUtk = _ref3.hubspotUtk,
        portalId = _ref3.portalId,
        referrer = _ref3.referrer,
        hstc = _ref3.hstc,
        hssc = _ref3.hssc,
        email = _ref3.email,
        identificationToken = _ref3.identificationToken;
    var requestParams = buildRequestParams({
        messagesUtk: messagesUtk,
        hubspotUtk: hubspotUtk,
        portalId: portalId,
        referrer: referrer,
        hstc: hstc,
        hssc: hssc,
        email: email,
        identificationToken: identificationToken
    });
    return "/_hcms/livechat/widget" + requestParams;
}

function getPublicRequestUrl(_ref4) {
    var messagesHublet = _ref4.messagesHublet,
        messagesEnv = _ref4.messagesEnv,
        messagesUtk = _ref4.messagesUtk,
        hubspotUtk = _ref4.hubspotUtk,
        portalId = _ref4.portalId,
        referrer = _ref4.referrer,
        hstc = _ref4.hstc,
        hssc = _ref4.hssc,
        email = _ref4.email,
        identificationToken = _ref4.identificationToken;
    var domain = (0, _getApiDomain.getApiDomain)(messagesEnv, messagesHublet);
    var requestParams = buildRequestParams({
        messagesUtk: messagesUtk,
        hubspotUtk: hubspotUtk,
        portalId: portalId,
        referrer: referrer,
        hstc: hstc,
        hssc: hssc,
        email: email,
        identificationToken: identificationToken
    });
    return domain + "/livechat-public/v1/message/public" + requestParams;
}