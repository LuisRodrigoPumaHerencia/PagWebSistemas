"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPerfAttributes = getPerfAttributes;

var _constants = require("./constants");

var _buildCmsScriptLoaderSrc = require("./util/buildCmsScriptLoaderSrc");

var _buildCmsScriptLoaderPath = require("./util/buildCmsScriptLoaderPath");

var _buildNonCmsScriptLoaderPath = require("./util/buildNonCmsScriptLoaderPath");

function getPerfAttributes(_ref) {
    var portalId = _ref.portalId,
        messagesEnv = _ref.messagesEnv;
    var env = messagesEnv === 'qa' ? 'qa' : '';
    var nonCmsSriptLoaderScriptPath = (0, _buildNonCmsScriptLoaderPath.buildNonCmsScriptLoaderPath)({
        env: env,
        portalId: portalId
    });
    var cmsScriptLoaderScriptSrc = (0, _buildCmsScriptLoaderSrc.buildCmsScriptLoaderSrc)({
        portalId: portalId
    });
    var cmsScriptLoaderScriptPath = (0, _buildCmsScriptLoaderPath.buildCmsScriptLoaderPath)({
        portalId: portalId
    });
    var embedScriptPath = "https://js.usemessages" + env + ".com/conversations-embed.js";
    var usingCmsScriptLoader = Boolean(document.querySelector("script[src=\"" + cmsScriptLoaderScriptSrc + "\"]"));

    try {
        performance.measure(_constants.EXECUTION_MEASUREMENT_PRE_DELAY, _constants.START_MARK_PRE_DELAY, _constants.END_MARK_PRE_DELAY);
        performance.measure(_constants.EXECUTION_MEASUREMENT_POST_DELAY, _constants.START_MARK_POST_DELAY, _constants.END_MARK_POST_DELAY);
        var iframeLoadTimePreDelay = performance.getEntriesByName(_constants.EXECUTION_MEASUREMENT_PRE_DELAY)[0];
        var iframeLoadTimePostDelay = performance.getEntriesByName(_constants.EXECUTION_MEASUREMENT_POST_DELAY)[0];
        var iframeLoadTimeDuration = iframeLoadTimePreDelay.duration + iframeLoadTimePostDelay.duration;
        var nonCmsScriptLoaderScriptFetchTime = performance.getEntriesByName(nonCmsSriptLoaderScriptPath)[0];
        var cmsScriptLoaderScriptFetchTime = performance.getEntriesByName(cmsScriptLoaderScriptPath)[0];
        var fetchTimeToUse = usingCmsScriptLoader ? cmsScriptLoaderScriptFetchTime : nonCmsScriptLoaderScriptFetchTime;
        var scriptLoaderFetchTimeDuration = fetchTimeToUse.duration;
        var embedScriptFetchTime = performance.getEntriesByName(embedScriptPath)[0];
        var embedScriptFetchTimeDuration = embedScriptFetchTime.duration;

        if (iframeLoadTimeDuration && scriptLoaderFetchTimeDuration && embedScriptFetchTimeDuration) {
            return {
                iframeLoadTime: iframeLoadTimeDuration,
                scriptLoaderScriptTime: scriptLoaderFetchTimeDuration,
                embedScriptTime: embedScriptFetchTimeDuration
            };
        }
    } catch (error) { //
    }

    return null;
}