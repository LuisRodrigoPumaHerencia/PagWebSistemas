"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.urlHasHsChatHashLink = void 0;
var HS_CHAT_PARAM = '#hs-chat-open';
var chatHashUrlRegex = new RegExp("" + HS_CHAT_PARAM, 'i');

var urlHasHsChatHashLink = function urlHasHsChatHashLink(url) {
    return chatHashUrlRegex.test(url);
};

exports.urlHasHsChatHashLink = urlHasHsChatHashLink;