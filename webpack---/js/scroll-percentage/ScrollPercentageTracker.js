"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

var _passiveEventListenerSupported = require("./util/passiveEventListenerSupported");

var _getBodyScrollTop = require("./util/getBodyScrollTop");

var _getViewportHeight = require("./util/getViewportHeight");

var _getPageHeight = require("./util/getPageHeight");

var _receivedPostMessageTypes = require("../iframe-communication/constants/receivedPostMessageTypes");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var ScrollPercentageTracker = /*#__PURE__*/ function() {
    function ScrollPercentageTracker(_ref) {
        var onScroll = _ref.onScroll;

        _classCallCheck(this, ScrollPercentageTracker);

        this._onScroll = onScroll;
        this._handleScroll = this._handleScroll.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    _createClass(ScrollPercentageTracker, [{
        key: "_handleScroll",
        value: function _handleScroll() {
            var pageHeightAndViewportDifference = (0, _getPageHeight.getPageHeight)() - (0, _getViewportHeight.getViewportHeight)();

            if (pageHeightAndViewportDifference === 0) {
                return;
            }

            var scrollPercentage = 100 * (0, _getBodyScrollTop.getBodyScrollTop)() / pageHeightAndViewportDifference;

            this._onScroll({
                scrollPercentage: scrollPercentage
            });
        }
    }, {
        key: "_add",
        value: function _add() {
            var useCapture = true;

            if ((0, _passiveEventListenerSupported.passiveEventListenerSupported)()) {
                window.addEventListener('scroll', this._handleScroll, {
                    capture: useCapture,
                    passive: true
                });
            } else {
                window.addEventListener('scroll', this._handleScroll, useCapture);
            }
        }
    }, {
        key: "add",
        value: function add() {
            this.remove();

            this._add();
        }
    }, {
        key: "remove",
        value: function remove() {
            var useCapture = true;

            if ((0, _passiveEventListenerSupported.passiveEventListenerSupported)()) {
                window.removeEventListener('scroll', this._handleScroll, {
                    capture: useCapture,
                    passive: true
                });
            } else {
                window.removeEventListener('scroll', this._handleScroll, useCapture);
            }
        }
    }, {
        key: "registerPostMessageReceivers",
        value: function registerPostMessageReceivers(postMessageReceiver) {
            postMessageReceiver.register(_receivedPostMessageTypes.START_TRACK_SCROLL_PERCENTAGE, this.add);
            postMessageReceiver.register(_receivedPostMessageTypes.STOP_TRACK_SCROLL_PERCENTAGE, this.remove);
        }
    }]);

    return ScrollPercentageTracker;
}();

var _default = ScrollPercentageTracker;
exports.default = _default;
module.exports = exports.default;