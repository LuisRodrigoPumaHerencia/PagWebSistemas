"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.executeAllIframeMessageQueueEvents = void 0;

var _postMessageToIframe = require("./postMessageToIframe");

var executeAllIframeMessageQueueEvents = function executeAllIframeMessageQueueEvents(_ref) {
    var iframe = _ref.iframe,
        iframeSrc = _ref.iframeSrc,
        eventQueue = _ref.eventQueue;

    do {
        var event = eventQueue.dequeue();

        if (event) {
            var type = event.type,
                data = event.data;
            (0, _postMessageToIframe.postMessageToIframe)({
                iframe: iframe,
                iframeSrc: iframeSrc,
                type: type,
                data: data
            });
        }
    } while (eventQueue.peek() && Object.keys(eventQueue.peek()) !== 0);
};

exports.executeAllIframeMessageQueueEvents = executeAllIframeMessageQueueEvents;