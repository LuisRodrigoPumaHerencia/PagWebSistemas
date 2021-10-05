"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getApiDomain = getApiDomain;

function getApiDomain(messagesEnv, messagesHublet) {
    var envString = messagesEnv === 'qa' ? 'qa' : '';
    var hubletString = messagesHublet === 'na1' || !messagesHublet ? '' : "-" + messagesHublet;
    return "https://api" + hubletString + ".hubspot" + envString + ".com";
}