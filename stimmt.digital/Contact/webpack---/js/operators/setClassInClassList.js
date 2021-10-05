"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setClassInClassList = void 0;

var _widgetLocation = require("../constants/widgetLocation");

var _widgetClassNames = require("../constants/widgetClassNames");

var _classNames;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var classNames = (_classNames = {}, _defineProperty(_classNames, _widgetLocation.LEFT_ALIGNED, _widgetClassNames.ALIGNED_LEFT_CLASS), _defineProperty(_classNames, _widgetLocation.RIGHT_ALIGNED, _widgetClassNames.ALIGNED_RIGHT_CLASS), _classNames);

var setClassInClassList = function setClassInClassList(_ref) {
    var widgetLocation = _ref.widgetLocation,
        classList = _ref.classList;
    var widgetLocationClass = classNames[widgetLocation];

    if (!classList.contains(widgetLocationClass)) {
        var otherLocations = Object.keys(classNames).filter(function(className) {
            return className !== widgetLocation;
        });
        otherLocations.forEach(function(location) {
            classList.remove(location);
        });
        classList.add(widgetLocationClass);
    }
};

exports.setClassInClassList = setClassInClassList;