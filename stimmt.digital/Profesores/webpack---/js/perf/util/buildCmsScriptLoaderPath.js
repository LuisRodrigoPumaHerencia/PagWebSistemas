"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildCmsScriptLoaderPath = void 0;

var _buildCmsScriptLoaderSrc = require("./buildCmsScriptLoaderSrc");

var buildCmsScriptLoaderPath = function buildCmsScriptLoaderPath(_ref) {
    var portalId = _ref.portalId;
    var scriptSrc = (0, _buildCmsScriptLoaderSrc.buildCmsScriptLoaderSrc)({
        portalId: portalId
    });
    return "" + document.location.origin + scriptSrc;
};

exports.buildCmsScriptLoaderPath = buildCmsScriptLoaderPath;