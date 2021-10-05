"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIdentificationToken = exports.getIdentificationEmail = exports.getEnableWidgetCookieBanner = exports.shouldDisableAttachment = exports.shouldEmbedInline = exports.getInlineEmbedSelector = exports.shouldBeFullscreen = exports.shouldLoadImmediately = void 0;

var _getExternalApiSettings = require("./getExternalApiSettings");

var shouldLoadImmediately = function shouldLoadImmediately() {
    return !!(0, _getExternalApiSettings.getExternalApiSettings)().loadImmediately;
};

exports.shouldLoadImmediately = shouldLoadImmediately;

var shouldBeFullscreen = function shouldBeFullscreen() {
    return !!(0, _getExternalApiSettings.getExternalApiSettings)().isFullscreen;
};

exports.shouldBeFullscreen = shouldBeFullscreen;

var getInlineEmbedSelector = function getInlineEmbedSelector() {
    return (0, _getExternalApiSettings.getExternalApiSettings)().inlineEmbedSelector;
};

exports.getInlineEmbedSelector = getInlineEmbedSelector;

var shouldEmbedInline = function shouldEmbedInline() {
    return !!(0, _getExternalApiSettings.getExternalApiSettings)().inlineEmbedSelector;
};

exports.shouldEmbedInline = shouldEmbedInline;

var shouldDisableAttachment = function shouldDisableAttachment() {
    return !!(0, _getExternalApiSettings.getExternalApiSettings)().disableAttachment;
};

exports.shouldDisableAttachment = shouldDisableAttachment;

var getEnableWidgetCookieBanner = function getEnableWidgetCookieBanner() {
    return (0, _getExternalApiSettings.getExternalApiSettings)().enableWidgetCookieBanner;
};

exports.getEnableWidgetCookieBanner = getEnableWidgetCookieBanner;

var getIdentificationEmail = function getIdentificationEmail() {
    return (0, _getExternalApiSettings.getExternalApiSettings)().identificationEmail;
};

exports.getIdentificationEmail = getIdentificationEmail;

var getIdentificationToken = function getIdentificationToken() {
    return (0, _getExternalApiSettings.getExternalApiSettings)().identificationToken;
};

exports.getIdentificationToken = getIdentificationToken;