"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildCmsScriptLoaderSrc = void 0;

var buildCmsScriptLoaderSrc = function buildCmsScriptLoaderSrc(_ref) {
    var portalId = _ref.portalId;
    return "/hs/scriptloader/" + portalId + ".js";
};

exports.buildCmsScriptLoaderSrc = buildCmsScriptLoaderSrc;