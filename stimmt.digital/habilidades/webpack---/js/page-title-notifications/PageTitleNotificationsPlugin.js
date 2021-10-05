"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

var _stringInvariant = require("../invariants/stringInvariant");

var _pageTitleNotificationsConstants = require("./constants/pageTitleNotificationsConstants");

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

/** Class that responds to message events by updating the document's title */
var PageTitleNotificationsPlugin = /*#__PURE__*/ function() {
    /**
     * Create a page title manager
     * @param {Object} config - object to configure the manager at instantiation time
     * @param {PostMessageHandler} config.postMessageHandler - post message handler with which handlers will be registered
     */
    function PageTitleNotificationsPlugin() {
        _classCallCheck(this, PageTitleNotificationsPlugin);

        this.handleShow = this.handleShow.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.notificationIntervalId = null;
        this.notificationMessageIsInPageTitle = false;
        this.cachedOriginalDocumentTitle = null;
    }
    /**
     * Clear the existing interval for the notification animation
     */


    _createClass(PageTitleNotificationsPlugin, [{
        key: "clearNotificationInterval",
        value: function clearNotificationInterval() {
            clearInterval(this.notificationIntervalId);
        }
        /**
         * @return {boolean} - whether or not a notification is currently running
         */

    }, {
        key: "notificationIntervalIsRunning",
        value: function notificationIntervalIsRunning() {
            return Boolean(this.notificationIntervalId);
        }
        /**
         * Start the timing sequence for a page title notification
         * @param {Object} data
         * @param {string} title - the custom notification to show in the page title
         */

    }, {
        key: "start",
        value: function start(_ref) {
            var _this = this;

            var title = _ref.title;

            if (this.notificationIntervalIsRunning()) {
                return;
            }

            this.cachedOriginalDocumentTitle = document.title;
            this.togglePageTitle({
                notificationTitle: title
            });
            this.notificationIntervalId = setInterval(function() {
                _this.togglePageTitle({
                    notificationTitle: title
                });
            }, _pageTitleNotificationsConstants.NOTIFICATION_INTERVAL_MS);
        }
        /**
         * Stop the current timing sequence for a page title notification
         */

    }, {
        key: "stop",
        value: function stop() {
            this.clearNotificationInterval();
            this.updatePageTitle(this.cachedOriginalDocumentTitle);
            this.notificationIntervalId = null;
            this.notificationMessageIsInPageTitle = false;
            this.cachedOriginalDocumentTitle = null;
        }
        /**
         * Switch the page title between its original value and the notification text
         * @param {Object} data
         * @param {string} data.notificationTitle - the custom notification text to show in the page title
         */

    }, {
        key: "togglePageTitle",
        value: function togglePageTitle(_ref2) {
            var notificationTitle = _ref2.notificationTitle;

            if (this.notificationMessageIsInPageTitle) {
                this.updatePageTitle(this.cachedOriginalDocumentTitle);
                this.notificationMessageIsInPageTitle = false;
            } else {
                this.updatePageTitle(notificationTitle);
                this.notificationMessageIsInPageTitle = true;
            }
        }
        /**
         * Handle a SHOW_PAGE_TITLE_NOTIFICATION message event
         * @param {Object} messageEvent - An object with parsed messageEvent event data
         * @param {Object} messageEvent.data - An object with data about the parsed message event
         */

    }, {
        key: "handleShow",
        value: function handleShow(_ref3) {
            var data = _ref3.data;
            this.start({
                title: data.title
            });
        }
        /**
         * Handle a CLEAR_PAGE_TITLE_NOTIFICATION message event
         */

    }, {
        key: "handleClear",
        value: function handleClear() {
            this.stop();
        }
        /**
         * Update the html document title
         * @param {string} title - The value to which the document title should be set
         */

    }, {
        key: "updatePageTitle",
        value: function updatePageTitle(title) {
            (0, _stringInvariant.stringInvariant)(title);
            document.title = title;
        }
    }]);

    return PageTitleNotificationsPlugin;
}();

var _default = PageTitleNotificationsPlugin;
exports.default = _default;
module.exports = exports.default;