"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildNonCmsScriptLoaderPath = void 0;

var buildNonCmsScriptLoaderPath = function buildNonCmsScriptLoaderPath(_ref) {
    var _ref$env = _ref.env,
        env = _ref$env === void 0 ? '' : _ref$env,
        portalId = _ref.portalId;
    return document.location.protocol + "//js.hs-scripts" + env + ".com/" + portalId + ".js";
};

exports.buildNonCmsScriptLoaderPath = buildNonCmsScriptLoaderPath;