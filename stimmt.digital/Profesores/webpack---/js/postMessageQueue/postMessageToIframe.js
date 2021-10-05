"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.postMessageToIframe = void 0;

var postMessageToIframe = function postMessageToIframe(_ref) {
    var iframe = _ref.iframe,
        iframeSrc = _ref.iframeSrc,
        type = _ref.type,
        data = _ref.data;
    iframe.contentWindow.postMessage(JSON.stringify({
        type: type,
        data: data
    }), iframeSrc);
};

exports.postMessageToIframe = postMessageToIframe;