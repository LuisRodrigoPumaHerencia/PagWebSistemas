"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasRequiredFeatures = hasRequiredFeatures;

function hasRequiredFeatures(window) {
    var featureDetectors = [typeof window.WeakMap === 'function', typeof window.requestAnimationFrame === 'function'];
    return featureDetectors.every(function(featureDetector) {
        return featureDetector === true;
    });
}