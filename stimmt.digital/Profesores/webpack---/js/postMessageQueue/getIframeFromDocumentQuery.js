"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIframeFromDocumentQuery = void 0;

var _settingsHelpers = require("../external-api/settingsHelpers");

var _elementSelectors = require("../constants/elementSelectors");

var getIframeFromDocumentQuery = function getIframeFromDocumentQuery() {
    var parentQuery = (0, _settingsHelpers.shouldEmbedInline)() ? (0, _settingsHelpers.getInlineEmbedSelector)() : "#" + _elementSelectors.PARENT_ID;
    return document.querySelector(parentQuery + " iframe");
};

exports.getIframeFromDocumentQuery = getIframeFromDocumentQuery;