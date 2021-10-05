"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.chooseMessagesUtk = chooseMessagesUtk;

var _hsGenerator = require("../utils/hsGenerator");

function chooseMessagesUtk() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        existingMessagesUtk = _ref.existingMessagesUtk;

    var messagesUtk;
    var isFirstVisitorSession = false;

    if (existingMessagesUtk) {
        messagesUtk = existingMessagesUtk;
    } else {
        isFirstVisitorSession = true;
        messagesUtk = (0, _hsGenerator.getUuid)();
    }

    return {
        messagesUtk: messagesUtk,
        isFirstVisitorSession: isFirstVisitorSession
    };
}