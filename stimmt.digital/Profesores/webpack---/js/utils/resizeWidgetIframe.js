"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resizeWidgetIframe = void 0;

var _elementSelectors = require("../constants/elementSelectors");

var _whichDevice = require("./whichDevice");

var resizeWidgetIframe = function resizeWidgetIframe(_ref) {
    var height = _ref.height,
        width = _ref.width,
        isOpen = _ref.isOpen;
    var parent = document.getElementById(_elementSelectors.PARENT_ID);

    if ((0, _whichDevice.isAnyMobile)() && isOpen) {
        parent.style.width = '100%';
        parent.style.height = '100%';
    } else if (height && width) {
        parent.style.width = width + "px";
        parent.style.height = height + "px";
    }
};

exports.resizeWidgetIframe = resizeWidgetIframe;