"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetShell = void 0;

var _whichDevice = require("./utils/whichDevice");

var _receivedPostMessageTypes = require("./iframe-communication/constants/receivedPostMessageTypes");

var _sentPostMessageTypes = require("./iframe-communication/constants/sentPostMessageTypes");

var _PostMessageReceiver2 = require("./iframe-communication/PostMessageReceiver");

var _pageTitleNotificationsPostMessageTypes = require("./page-title-notifications/constants/pageTitleNotificationsPostMessageTypes");

var _PageTitleNotificationsPlugin = _interopRequireDefault(require("./page-title-notifications/PageTitleNotificationsPlugin"));

var _getWidgetDataResponseType = require("./operators/getWidgetDataResponseType");

var _operators = require("./cookies/operators");

var _constants = require("./cookies/constants");

var _times = _interopRequireDefault(require("./cookies/times"));

var _clearCookies = require("./cookies/clearCookies");

var _widgetClassNames = require("./constants/widgetClassNames");

var _widgetResponseTypes = require("./constants/widgetResponseTypes");

var _setMessagesUtk = require("./utk/setMessagesUtk");

var _isEmbeddedInProduct = require("./utils/isEmbeddedInProduct");

var _shouldRenderWidget2 = require("./utils/shouldRenderWidget");

var _shouldWidgetStartOpen = require("./utils/shouldWidgetStartOpen");

var _elementSelectors = require("./constants/elementSelectors");

var _setupExternalApi = require("./external-api/setupExternalApi");

var _flushOnReadyCallbacks = require("./external-api/flushOnReadyCallbacks");

var _DevLogger = _interopRequireDefault(require("./external-api/DevLogger"));

var _EventEmitter = _interopRequireDefault(require("./event-emitter/EventEmitter"));

var _handleExternalApiEventMessage2 = require("./event-emitter/handleExternalApiEventMessage");

var _fetchWidgetData = require("./requests/fetchWidgetData");

var _events = require("./events");

var _throttle = require("./utils/throttle");

var _getIframeQueryParams = require("./utils/getIframeQueryParams");

var _settingsHelpers = require("./external-api/settingsHelpers");

var _ScrollPercentageTracker = _interopRequireDefault(require("./scroll-percentage/ScrollPercentageTracker"));

var _ExitIntentTracker = _interopRequireDefault(require("./exit-intent/ExitIntentTracker"));

var _markEnd = require("./perf/markEnd");

var _setClassInClassList = require("./operators/setClassInClassList");

var _widgetDataKeys = require("./constants/widgetDataKeys");

var _resetAndLaunchWidget = require("./utk/resetAndLaunchWidget");

var _extendedFunctions = require("./constants/extendedFunctions");

var _ApiUsageTracker = require("./external-api/ApiUsageTracker");

var _PostMessageApiClient = require("./iframe-communication/PostMessageApiClient");

var _sendWidgetDataToIframe = require("./postMessageMethods/sendWidgetDataToIframe");

var _registerCookieListeners = require("./cookies/registerCookieListeners");

var _registerHashChangeListener = require("./event-listener/registerHashChangeListener");

var _registerWindowResizeListener = require("./event-listener/registerWindowResizeListener");

var _iframeMessagePool = require("./postMessageQueue/iframeMessagePool");

var _hideWelcomeMessage = require("./utils/hideWelcomeMessage");

var _resizeWidgetIframe = require("./utils/resizeWidgetIframe");

var _handleTargetingAndDelay = require("./utils/handleTargetingAndDelay");

var _getGlobalCookieOptOut = require("./utk/getGlobalCookieOptOut");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

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

var HELP_WIDGET_ID = 'help-widget';

var noop = function noop() {};

var WidgetShell = /*#__PURE__*/ function() {
    function WidgetShell(embedScriptContext, eventEmitter, errorLogger) {
        var _this = this,
            _PostMessageReceiver;

        _classCallCheck(this, WidgetShell);

        this.loadIFrame = function() {
            if ((0, _whichDevice.isAnyMobile)()) {
                document.documentElement.classList.add(_widgetClassNames.MOBILE);
            }

            var iframe = document.createElement('iframe');
            _this.iframeSrc = _this.embedScriptContext.getIFrameSrc();
            iframe.src = _this.iframeSrc;
            iframe.title = 'chat widget';
            iframe.addEventListener('load', _this.handleIframeLoad);
            iframe.allowFullscreen = true;
            /**
             * Inline embed
             */

            if ((0, _settingsHelpers.shouldEmbedInline)()) {
                var embedElement = document.querySelector((0, _settingsHelpers.getInlineEmbedSelector)());

                if (!embedElement) {
                    _this.devLogger.error("cannot embed widget - element at `" + (0, _settingsHelpers.getInlineEmbedSelector)() + "` cannot be found");

                    return;
                }

                var parent = document.createElement('div');
                parent.id = _elementSelectors.INLINE_PARENT_ID;
                iframe.id = _elementSelectors.INLINE_IFRAME_ID;
                parent.appendChild(iframe);
                embedElement.appendChild(parent);
                return;
            }
            /**
             * Normal embed
             */


            if (!document.getElementById(_elementSelectors.PARENT_ID)) {
                var _parent = document.createElement('div');

                _parent.id = _elementSelectors.PARENT_ID;
                var shadowContainer = document.createElement('div');
                shadowContainer.className = _widgetClassNames.SHADOW_CONTAINER;
                var embeddedInProduct = (0, _isEmbeddedInProduct.isEmbeddedInProduct)(_this.embedScriptContext);

                if (embeddedInProduct) {
                    _parent.classList.add(_widgetClassNames.INTERNAL);

                    shadowContainer.classList.add(_widgetClassNames.INTERNAL);
                }

                _parent.appendChild(shadowContainer);

                if (embeddedInProduct) {
                    iframe.id = HELP_WIDGET_ID;
                }

                _parent.appendChild(iframe);

                document.body.appendChild(_parent);
            }

            _this.setFrameClass();
        };

        this.setWidgetData = function(widgetData) {
            _this.widgetData = widgetData;

            _this.setFrameClass();
        };

        this.embedScriptContext = embedScriptContext;
        this.isOpen = (0, _shouldWidgetStartOpen.shouldWidgetStartOpen)();
        this.widgetData = null;
        this.iframeSrc = null;
        this.hasLoadedIframe = false;
        this.isLoadingIframe = false;
        this.requestWidgetOpen = this.requestWidgetOpen.bind(this);
        this.requestWidgetClose = this.requestWidgetClose.bind(this);
        this.requestWidgetRefresh = (0, _throttle.throttle)(this.requestWidgetRefresh.bind(this), 1000);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleIframeLoad = this.handleIframeLoad.bind(this);
        this.handleResizeMessage = this.handleResizeMessage.bind(this);
        this.handleOpenChange = this.handleOpenChange.bind(this);
        this.handleStoreMessagesCookie = this.handleStoreMessagesCookie.bind(this);
        this.handleRequestWidget = this.handleRequestWidget.bind(this);
        this.handleWidgetRefresh = this.handleWidgetRefresh.bind(this);
        this.setWidgetNotLoaded = this.setWidgetNotLoaded.bind(this);
        this.removeIframe = this.removeIframe.bind(this);
        this.handleExternalApiEventMessage = this.handleExternalApiEventMessage.bind(this);
        this.loadWidget = (0, _throttle.throttle)(this.loadWidget.bind(this), 1000);
        this.resetAndReloadWidget = this.resetAndReloadWidget.bind(this);
        this.setWidgetOpenCookie = this.setWidgetOpenCookie.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleExitIntent = this.handleExitIntent.bind(this);
        this.extendedClearCookiesFunction = this.extendedClearCookiesFunction.bind(this);
        this.openToNewThread = this.openToNewThread.bind(this);
        this.devLogger = new _DevLogger.default();
        this.eventEmitter = eventEmitter || new _EventEmitter.default();
        this.logError = errorLogger ? errorLogger.logError : noop;
        this.scrollPercentageTracker = new _ScrollPercentageTracker.default({
            onScroll: this.handleScroll
        });
        this.exitIntentTracker = new _ExitIntentTracker.default({
            onExitIntent: this.handleExitIntent
        });
        this.iframeMessage = (0, _iframeMessagePool.iframeMessagePool)({
            iframeSrc: this.embedScriptContext.getIFrameSrc()
        });
        this.apiUsageTracker = new _ApiUsageTracker.ApiUsageTracker({
            postMessageToIframe: this.iframeMessage.post
        });
        var postMessageApiClient = new _PostMessageApiClient.PostMessageApiClient(this.iframeMessage.post);
        var pageTitleNotifications = new _PageTitleNotificationsPlugin.default();
        this.postMessageReceiver = new _PostMessageReceiver2.PostMessageReceiver((_PostMessageReceiver = {}, _defineProperty(_PostMessageReceiver, _pageTitleNotificationsPostMessageTypes.SHOW_PAGE_TITLE_NOTIFICATION, pageTitleNotifications.handleShow), _defineProperty(_PostMessageReceiver, _pageTitleNotificationsPostMessageTypes.CLEAR_PAGE_TITLE_NOTIFICATION, pageTitleNotifications.handleClear), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.REQUEST_WIDGET, this.handleRequestWidget), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.IFRAME_RESIZE, this.handleResizeMessage), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.OPEN_CHANGE, this.handleOpenChange), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.CLOSED_WELCOME_MESSAGE, _hideWelcomeMessage.hideWelcomeMessage), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.STORE_MESSAGES_COOKIE, this.handleStoreMessagesCookie), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.EXTERNAL_API_EVENT, this.handleExternalApiEventMessage), _defineProperty(_PostMessageReceiver, _receivedPostMessageTypes.API_REQUEST, postMessageApiClient.makeApiRequest), _PostMessageReceiver), {
            allowedOrigin: this.embedScriptContext.getIFrameDomain(),
            iframeUuid: this.embedScriptContext.iframeUuid
        });
        this.exitIntentTracker.registerPostMessageReceivers(this.postMessageReceiver);
        this.scrollPercentageTracker.registerPostMessageReceivers(this.postMessageReceiver);
    }

    _createClass(WidgetShell, [{
        key: "handleExternalApiEventMessage",
        value: function handleExternalApiEventMessage(message) {
            (0, _handleExternalApiEventMessage2.handleExternalApiEventMessage)(message, {
                eventEmitter: this.eventEmitter
            });
        }
    }, {
        key: "handleScroll",
        value: function handleScroll(_ref) {
            var scrollPercentage = _ref.scrollPercentage;
            this.iframeMessage.post(_sentPostMessageTypes.SCROLL_PERCENTAGE_CHANGE, {
                scrollPercentage: scrollPercentage
            });
        }
    }, {
        key: "handleExitIntent",
        value: function handleExitIntent() {
            this.iframeMessage.post(_sentPostMessageTypes.EXIT_INTENT);
        }
    }, {
        key: "getStatus",
        value: function getStatus() {
            return {
                loaded: this.hasLoadedIframe,
                pending: this.isLoadingIframe
            };
        }
    }, {
        key: "handleIframeLoad",
        value: function handleIframeLoad() {
            this.handleWindowResize();
            this.hasLoadedIframe = true;
            this.isLoadingIframe = false;
            (0, _markEnd.markEndPostDelay)();
            this.postPerfAttributes(this.embedScriptContext.getPerfAttributes());
        }
    }, {
        key: "postPerfAttributes",
        value: function postPerfAttributes(perfAttributes) {
            // Only send these metrics 50% of the time to
            // stay further away from our New Relic data limit
            if (Math.random() < 0.5) {
                this.iframeMessage.post(_sentPostMessageTypes.PERF_ATTRIBUTES, {
                    perfAttributes: perfAttributes
                });
            }
        }
    }, {
        key: "resetAndReloadWidget",
        value: function resetAndReloadWidget() {
            this.removeIframe();
            (0, _resetAndLaunchWidget.resetAndLaunchWidget)();
        }
    }, {
        key: "removeIframe",
        value: function removeIframe() {
            var iframeContainer = (0, _settingsHelpers.shouldEmbedInline)() ? document.getElementById(_elementSelectors.INLINE_PARENT_ID) : document.getElementById(_elementSelectors.PARENT_ID);

            if (iframeContainer) {
                iframeContainer.remove();
            }

            this.iframeSrc = null;
            this.hasLoadedIframe = false;
            this.isLoadingIframe = false;
        }
    }, {
        key: "handleResizeMessage",
        value: function handleResizeMessage(_ref2) {
            var _ref2$data = _ref2.data;
            _ref2$data = _ref2$data === void 0 ? {} : _ref2$data;
            var height = _ref2$data.height,
                width = _ref2$data.width;
            (0, _resizeWidgetIframe.resizeWidgetIframe)({
                height: height,
                width: width,
                isOpen: this.isOpen
            });
        }
    }, {
        key: "setWidgetOpenCookie",
        value: function setWidgetOpenCookie(_ref3) {
            var isOpen = _ref3.isOpen;
            (0, _operators.setCookie)(_constants.cookies.IS_OPEN, isOpen, _times.default.THIRTY_MINUTES);
        }
    }, {
        key: "handleOpenChange",
        value: function handleOpenChange(_ref4) {
            var _ref4$data = _ref4.data,
                isOpen = _ref4$data.isOpen,
                isUser = _ref4$data.isUser;
            var html = document.documentElement;
            var parent = document.getElementById(_elementSelectors.PARENT_ID);
            var shadowContainer = parent.getElementsByClassName(_widgetClassNames.SHADOW_CONTAINER)[0];
            this.isOpen = isOpen;

            if (isUser) {
                this.setWidgetOpenCookie({
                    isOpen: this.isOpen
                });
            }

            if (this.isOpen) {
                html.classList.add(_widgetClassNames.ACTIVE);
                shadowContainer.classList.add('active');
            } else {
                html.classList.remove(_widgetClassNames.ACTIVE);
                shadowContainer.classList.remove('active');
            }

            if ((0, _whichDevice.isAnyMobile)() && this.isOpen) {
                var height = window.innerHeight;
                var width = window.innerWidth;
                (0, _resizeWidgetIframe.resizeWidgetIframe)({
                    height: height,
                    width: width,
                    isOpen: this.isOpen
                });
            }
        }
    }, {
        key: "handleRequestWidget",
        value: function handleRequestWidget(_ref5) {
            var source = _ref5.source;
            (0, _sendWidgetDataToIframe.sendWidgetDataToIframe)({
                source: source,
                widgetData: this.widgetData,
                embedScriptContext: this.embedScriptContext,
                apiUsageTracker: this.apiUsageTracker
            });
        }
    }, {
        key: "handleStoreMessagesCookie",
        value: function handleStoreMessagesCookie(_ref6) {
            var data = _ref6.data;
            this.iframeMessage.post(_sentPostMessageTypes.FIRST_VISITOR_SESSION, {
                isFirstVisitorSession: false
            });

            if ((0, _getGlobalCookieOptOut.getGlobalCookieOptOut)() === 'yes') {
                window._hsp.push(['showBanner']);
            }

            (0, _setMessagesUtk.setMessagesUtk)(data);
        }
    }, {
        key: "requestWidgetOpen",
        value: function requestWidgetOpen() {
            if (this.isOpen) {
                this.devLogger.log('cannot open the widget, it is already open.');
                return;
            }

            this.iframeMessage.post(_sentPostMessageTypes.REQUEST_OPEN);
        }
    }, {
        key: "requestWidgetClose",
        value: function requestWidgetClose() {
            if (!this.isOpen) {
                this.devLogger.log('cannot close the widget, it is already closed');
                return;
            }

            this.iframeMessage.post(_sentPostMessageTypes.REQUEST_CLOSE);
        }
    }, {
        key: "handleWindowResize",
        value: function handleWindowResize() {
            var data = {
                height: window.innerHeight,
                width: window.innerWidth
            };
            this.iframeMessage.post(_sentPostMessageTypes.BROWSER_WINDOW_RESIZE, data);
        }
    }, {
        key: "requestWidgetRefresh",
        value: function requestWidgetRefresh() {
            var _this2 = this;

            var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                openToNewThread = _ref7.openToNewThread;

            var portalId = this.embedScriptContext.portalId;

            if (!this.hasLoadedIframe && this.isLoadingIframe) {
                this.devLogger.log('Cannot refresh the widget - it is currently loading.');
                return;
            }

            if (this.hasLoadedIframe) {
                var requestUrl = this.embedScriptContext.getInitialRequestUrl();
                (0, _fetchWidgetData.fetchWidgetData)({
                    requestUrl: requestUrl,
                    portalId: portalId
                }, function(widgetData) {
                    _this2.handleWidgetRefresh(widgetData);

                    if (openToNewThread) {
                        _this2.openToNewThread();
                    }
                });
            } else {
                this.loadWidget();

                if (openToNewThread) {
                    this.openToNewThread();
                }
            }
        }
    }, {
        key: "openToNewThread",
        value: function openToNewThread() {
            this.iframeMessage.post(_sentPostMessageTypes.OPEN_TO_NEW_THREAD);
        }
    }, {
        key: "extendedClearCookiesFunction",
        value: function extendedClearCookiesFunction(extendedFunction) {
            if (extendedFunction && extendedFunction[_extendedFunctions.RESET_WIDGET]) {
                this.removeIframe();
            }

            (0, _clearCookies.clearCookies)(extendedFunction);
        }
    }, {
        key: "handleWidgetRefresh",
        value: function handleWidgetRefresh(refreshedWidgetData) {
            this.setWidgetData(refreshedWidgetData);

            var shouldHideWidget = (0, _getWidgetDataResponseType.getWidgetDataResponseType)(this.widgetData) === _widgetResponseTypes.HIDE_WIDGET;

            if (shouldHideWidget) {
                this.removeIframe();
            } else {
                this.iframeMessage.post(_sentPostMessageTypes.REFRESH_WIDGET_DATA, _extends({}, this.widgetData, {}, (0, _getIframeQueryParams.getIframeQueryParams)(this.embedScriptContext)));
            }
        }
    }, {
        key: "setWidgetNotLoaded",
        value: function setWidgetNotLoaded() {
            this.hasLoadedIframe = false;
            this.isLoadingIframe = false;
        }
        /*
         * Load widget data for the current page
         *
         * @param {object}   options
         * @param {boolean} [options.widgetOpen] - whether or not the widget should render
         *                                         in an open state on initial load
         */

    }, {
        key: "loadWidget",
        value: function loadWidget() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var portalId = this.embedScriptContext.portalId;

            if (this.isLoadingIframe) {
                this.devLogger.log('Cannot load the widget - The widget is already being loaded.');
                this.logError('load widget called while public widget request is pending');
                return;
            }

            if (this.hasLoadedIframe) {
                this.devLogger.log('Cannot load the widget - the widget has already loaded.');
                return;
            }

            this.isLoadingIframe = true;

            if (options.widgetOpen) {
                this.setWidgetOpenCookie({
                    isOpen: true
                });
            }

            (0, _fetchWidgetData.fetchWidgetData)({
                requestUrl: this.embedScriptContext.getInitialRequestUrl(),
                portalId: portalId
            }, (0, _handleTargetingAndDelay.handleTargetingAndDelay)(this.setWidgetData, this.loadIFrame, this.setWidgetNotLoaded), function() {
                _events.EVENTS.messagesInitialized({
                    messageWillRender: false
                });
            });
        }
    }, {
        key: "start",
        value: function start() {
            var _this3 = this;

            var _shouldRenderWidget = (0, _shouldRenderWidget2.shouldRenderWidget)(this.embedScriptContext),
                shouldRender = _shouldRenderWidget.shouldRender;

            if (!shouldRender) {
                try {
                    // Prototype can cause this to fail
                    _events.EVENTS.messagesInitialized({
                        messageWillRender: false
                    });
                } catch (e) {
                    this.devLogger.log("widget load aborted");
                }

                return;
            }

            (0, _setupExternalApi.setupExternalApi)({
                debug: this.devLogger.debug,
                on: function on(eventName, listener) {
                    _this3.eventEmitter.on(eventName, listener);

                    _this3.apiUsageTracker.trackEventListener(eventName);
                },
                off: this.eventEmitter.off,
                clear: function clear() {
                    _this3.extendedClearCookiesFunction.apply(_this3, arguments);

                    _this3.apiUsageTracker.trackMethod('clear');
                },
                resetAndReloadWidget: this.resetAndReloadWidget,
                widget: {
                    load: function load() {
                        _this3.loadWidget.apply(_this3, arguments);

                        _this3.apiUsageTracker.trackMethod('load');
                    },
                    remove: function remove() {
                        _this3.removeIframe();

                        _this3.apiUsageTracker.trackMethod('remove');
                    },
                    open: function open() {
                        _this3.requestWidgetOpen();

                        _this3.apiUsageTracker.trackMethod('open');
                    },
                    close: function close() {
                        _this3.requestWidgetClose();

                        _this3.apiUsageTracker.trackMethod('close');
                    },
                    refresh: function refresh() {
                        _this3.requestWidgetRefresh.apply(_this3, arguments);

                        _this3.apiUsageTracker.trackMethod('refresh');
                    },
                    status: function status() {
                        _this3.apiUsageTracker.trackMethod('status');

                        return _this3.getStatus();
                    }
                }
            }, this.embedScriptContext);
            (0, _flushOnReadyCallbacks.flushOnReadyCallbacks)({
                logger: this.devLogger,
                trackCallback: this.apiUsageTracker.trackOnReady
            });
            (0, _registerHashChangeListener.registerHashChangeListener)({
                requestWidgetOpen: this.requestWidgetOpen,
                isOpen: this.isOpen
            });
            (0, _registerWindowResizeListener.registerWindowResizeListener)({
                resizeCallbackFn: this.handleWindowResize
            });
            (0, _registerCookieListeners.registerCookieListeners)({
                postMessageToIframe: this.iframeMessage.post
            });

            if ((0, _settingsHelpers.shouldLoadImmediately)()) {
                this.loadWidget();
            }
        }
    }, {
        key: "setFrameClass",
        value: function setFrameClass() {
            var parent = document.getElementById(_elementSelectors.PARENT_ID);
            if (!parent) return;
            var widgetLocation = this.widgetData[_widgetDataKeys.WIDGET_LOCATION];
            (0, _setClassInClassList.setClassInClassList)({
                widgetLocation: widgetLocation,
                classList: parent.classList
            });
        }
    }]);

    return WidgetShell;
}();

exports.WidgetShell = WidgetShell;