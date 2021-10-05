"use strict";
'use es6';
/* global messagesConfig */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createEmbedScriptContext = createEmbedScriptContext;

var _hsGenerator = require("../utils/hsGenerator");

var _prepareVisitorIdentifiers = require("../utk/prepareVisitorIdentifiers");

var _envGetters = require("./envGetters");

var _EmbedScriptContext = _interopRequireDefault(require("./EmbedScriptContext"));

var _settingsHelpers = require("../external-api/settingsHelpers");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function createEmbedScriptContext() {
    var _getScriptEnvParams = (0, _envGetters.getScriptEnvParams)(),
        messagesEnv = _getScriptEnvParams.messagesEnv,
        portalId = _getScriptEnvParams.portalId,
        messagesHublet = _getScriptEnvParams.messagesHublet;

    var useLocalBuild = false;

    try {
        useLocalBuild = localStorage && localStorage['live-chat-local-toggle'] === 'true'; // eslint-disable-next-line no-empty
    } catch (e) {}

    var iFrameDomainOverride = typeof messagesConfig !== 'undefined' && messagesConfig.iFrameDomain;
    var iframeUuid = (0, _hsGenerator.getUuid)();
    var referrer = encodeURIComponent(document.referrer);

    var _prepareVisitorIdenti = (0, _prepareVisitorIdentifiers.prepareVisitorIdentifiers)(),
        messagesUtk = _prepareVisitorIdenti.messagesUtk,
        hubspotUtk = _prepareVisitorIdenti.hubspotUtk,
        hstc = _prepareVisitorIdenti.hstc,
        hssc = _prepareVisitorIdenti.hssc,
        globalCookieOptOut = _prepareVisitorIdenti.globalCookieOptOut,
        isFirstVisitorSession = _prepareVisitorIdenti.isFirstVisitorSession;

    return new _EmbedScriptContext.default({
        messagesHublet: messagesHublet,
        globalCookieOptOut: globalCookieOptOut,
        hubspotUtk: hubspotUtk,
        hstc: hstc,
        hssc: hssc,
        iFrameDomainOverride: iFrameDomainOverride,
        iframeUuid: iframeUuid,
        isFirstVisitorSession: isFirstVisitorSession,
        messagesEnv: messagesEnv,
        messagesUtk: messagesUtk,
        referrer: referrer,
        portalId: portalId,
        useLocalBuild: useLocalBuild,
        identificationEmail: (0, _settingsHelpers.getIdentificationEmail)(),
        identificationToken: (0, _settingsHelpers.getIdentificationToken)()
    });
}