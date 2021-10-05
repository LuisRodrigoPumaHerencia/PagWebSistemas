"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getScriptEnvParams = getScriptEnvParams;
exports.getIsLocal = exports.getMessagesHublet = exports.getMessagesEnv = exports.getPortalId = void 0;

var getPortalId = function getPortalId() {
    var scriptElement = document.getElementById('hubspot-messages-loader');
    return parseInt(scriptElement.getAttribute('data-hsjs-portal'), 10);
};

exports.getPortalId = getPortalId;

var getMessagesEnv = function getMessagesEnv() {
    var scriptElement = document.getElementById('hubspot-messages-loader');
    return scriptElement.getAttribute('data-hsjs-env');
};

exports.getMessagesEnv = getMessagesEnv;

var getMessagesHublet = function getMessagesHublet() {
    var scriptElement = document.getElementById('hubspot-messages-loader');
    return scriptElement.getAttribute('data-hsjs-hublet');
};

exports.getMessagesHublet = getMessagesHublet;

var getIsLocal = function getIsLocal() {
    var scriptElement = document.getElementById('hubspot-messages-loader');
    return scriptElement.getAttribute('data-hsjs-local') === 'true';
};

exports.getIsLocal = getIsLocal;

function getScriptEnvParams() {
    var scriptElement = document.getElementById('hubspot-messages-loader');
    return {
        ungatedFor: scriptElement.getAttribute('ungated-for'),
        portalId: getPortalId(),
        messagesEnv: getMessagesEnv(),
        messagesHublet: getMessagesHublet(),
        isLocal: getIsLocal()
    };
}