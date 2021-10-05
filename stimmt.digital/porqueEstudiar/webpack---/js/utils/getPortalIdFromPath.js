"use strict";
'use es6'; // stolen from portalIdParser

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPortalIdFromPath = getPortalIdFromPath;
var pathRegex = /^\/(?:[A-Za-z0-9-_]*)\/(\d+)(?:\/|$)/;

function getPortalIdFromPath(path) {
    try {
        return pathRegex.exec(path)[1];
    } catch (e) {
        return '';
    }
}