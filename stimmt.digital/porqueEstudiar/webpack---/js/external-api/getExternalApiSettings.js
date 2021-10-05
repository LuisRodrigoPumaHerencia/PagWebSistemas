"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getExternalApiSettings = getExternalApiSettings;

var _constants = require("./constants");

var _booleanInvariant = require("../invariants/booleanInvariant");

var _stringInvariant = require("../invariants/stringInvariant");

var _oneOfListInvariant = require("../invariants/oneOfListInvariant");

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

var defaultSettings = {
    loadImmediately: true,
    isFullscreen: false,
    inlineEmbedSelector: '',
    disableAttachment: false,
    enableWidgetCookieBanner: false,
    identificationEmail: '',
    identificationToken: ''
};
/**
 * @returns {object}
 */

function getExternalApiSettings() {
    var customerSettings = window[_constants.SETTINGS_VARIABLE];

    var mergedSettings = _extends({}, defaultSettings, customerSettings);

    (0, _booleanInvariant.booleanInvariant)(mergedSettings.loadImmediately, 'mergedSettings.loadImmediately');
    (0, _booleanInvariant.booleanInvariant)(mergedSettings.isFullscreen, 'mergedSettings.isFullscreen');
    (0, _booleanInvariant.booleanInvariant)(mergedSettings.disableAttachment, 'mergedSettings.disableAttachment');
    (0, _oneOfListInvariant.oneOfListInvariant)(mergedSettings.enableWidgetCookieBanner, 'mergedSettings.enableWidgetCookieBanner', [false, true, _constants.ON_WIDGET_LOAD, _constants.ON_EXIT_INTENT]);
    (0, _stringInvariant.stringInvariant)(mergedSettings.inlineEmbedSelector, 'mergedSettings.inlineEmbedSelector');
    (0, _stringInvariant.stringInvariant)(mergedSettings.identificationEmail, 'mergedSettings.identificationEmail');
    (0, _stringInvariant.stringInvariant)(mergedSettings.identificationToken, 'mergedSettings.identificationToken');
    return mergedSettings;
}