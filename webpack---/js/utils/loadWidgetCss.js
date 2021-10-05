"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadWidgetCss = loadWidgetCss;

/* eslint-disable */
// A snippet of JS that includes the css contents on the page in a <style> tag, rather than having to include a separate css include alongside the JS
function loadWidgetCss(doc) {
    var styleContent = require('raw-loader!../../sass/messagesWidgetShell.sass');

    var styleTag = doc.createElement('style');
    styleTag.setAttribute('type', 'text/css');

    if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = styleContent;
    } else {
        var textTag = document.createTextNode(styleContent);
        styleTag.appendChild(textTag);
    }

    var pos = doc.body.childNodes[0];
    doc.body.insertBefore(styleTag, pos);
}