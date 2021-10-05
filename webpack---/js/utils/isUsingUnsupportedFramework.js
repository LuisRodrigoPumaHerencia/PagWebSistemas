"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUsingUnsupportedFramework = void 0;

var _unsupportedFramework = require("../constants/unsupportedFramework");

var isUsingUnsupportedFramework = function isUsingUnsupportedFramework() {
    // Check methods that are added/overwritten by frameworks
    // these methods cause issues that do not allow allow the visitor UI to render
    var overriddenMethods = _unsupportedFramework.METHODS.filter(function(method) {
        return !!method;
    }).length;

    return Boolean(overriddenMethods);
};

exports.isUsingUnsupportedFramework = isUsingUnsupportedFramework;