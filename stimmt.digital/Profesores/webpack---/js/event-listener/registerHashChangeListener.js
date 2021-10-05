"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerHashChangeListener = void 0;

var _urlHasHsChatHashLink = require("../utils/urlHasHsChatHashLink");

var registerHashChangeListener = function registerHashChangeListener(_ref) {
    var requestWidgetOpen = _ref.requestWidgetOpen,
        isOpen = _ref.isOpen;
    window.addEventListener('hashchange', function() {
        if ((0, _urlHasHsChatHashLink.urlHasHsChatHashLink)(window.location.href) && !isOpen) {
            requestWidgetOpen();
        }
    });
};

exports.registerHashChangeListener = registerHashChangeListener;