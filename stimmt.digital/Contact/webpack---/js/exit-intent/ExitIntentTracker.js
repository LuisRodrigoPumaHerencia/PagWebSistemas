"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

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

var ExitIntentTracker = /*#__PURE__*/ function() {
    function ExitIntentTracker(_ref) {
        var onExitIntent = _ref.onExitIntent;

        _classCallCheck(this, ExitIntentTracker);

        this._onExitIntent = onExitIntent;
        this._handleMouseOut = this._handleMouseOut.bind(this);
        this._isExitIntent = this._isExitIntent.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }
    /*
     * Inspired by lead-flows-js
     * https://git.hubteam.com/HubSpot/lead-flows-js/blob/33a0e9707336a2cd168c2d40084073d9619e077d/static/coffee/dynos/dyno_binder.coffee#L177-L184
     */


    _createClass(ExitIntentTracker, [{
        key: "_isExitIntent",
        value: function _isExitIntent(e) {
            if (!e) {
                return false;
            }

            var fromEl = e.relatedTarget || e.toElement;

            if (!fromEl || fromEl.nodeName === 'HTML') {
                if (e.clientY < 100) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "_handleMouseOut",
        value: function _handleMouseOut(e) {
            if (this._isExitIntent(e)) {
                this._onExitIntent();
            }
        }
    }, {
        key: "_add",
        value: function _add() {
            window.document.addEventListener('mouseout', this._handleMouseOut);
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
            window.document.removeEventListener('mouseout', this._handleMouseOut);
        }
    }, {
        key: "addExitIntentTracker",
        value: function addExitIntentTracker() {
            this.exitIntentTracker.add();
        }
    }, {
        key: "removeExitIntentTracker",
        value: function removeExitIntentTracker() {
            this.exitIntentTracker.remove();
        }
    }, {
        key: "registerPostMessageReceivers",
        value: function registerPostMessageReceivers(postMessageReceiver) {
            postMessageReceiver.register(_receivedPostMessageTypes.START_TRACK_EXIT_INTENT, this.add);
            postMessageReceiver.register(_receivedPostMessageTypes.STOP_TRACK_EXIT_INTENT, this.remove);
        }
    }]);

    return ExitIntentTracker;
}();

var _default = ExitIntentTracker;
exports.default = _default;
module.exports = exports.default;