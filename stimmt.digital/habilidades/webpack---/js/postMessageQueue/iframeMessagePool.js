"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.iframeMessagePool = exports.createQueue = void 0;

var _getIframeFromDocumentQuery = require("./getIframeFromDocumentQuery");

var _postMessageToIframe = require("./postMessageToIframe");

var _executeAllIframeMessageQueueEvents = require("./executeAllIframeMessageQueueEvents");

var createQueue = function createQueue() {
    var queue = [];
    return {
        enqueue: function enqueue(event) {
            return queue.unshift(event);
        },
        dequeue: function dequeue() {
            return queue.shift();
        },
        peek: function peek() {
            return queue[0];
        }
    };
};

exports.createQueue = createQueue;

var iframeMessagePool = function iframeMessagePool(_ref) {
    var iframeSrc = _ref.iframeSrc;
    var eventQueue = createQueue();
    return {
        post: function post(type) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var iframe = (0, _getIframeFromDocumentQuery.getIframeFromDocumentQuery)();

            if (!iframe) {
                eventQueue.enqueue({
                    type: type,
                    data: data
                });
            } else {
                (0, _postMessageToIframe.postMessageToIframe)({
                    iframe: iframe,
                    iframeSrc: iframeSrc,
                    type: type,
                    data: data
                });
                (0, _executeAllIframeMessageQueueEvents.executeAllIframeMessageQueueEvents)({
                    iframe: iframe,
                    iframeSrc: iframeSrc,
                    eventQueue: eventQueue
                });
            }
        }
    };
};

exports.iframeMessagePool = iframeMessagePool;