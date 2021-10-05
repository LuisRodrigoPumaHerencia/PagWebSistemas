"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchWidgetData = fetchWidgetData;
exports.EXPECTED_WIDGET_WILL_NOT_LOAD_CODES = exports.WIDGET_WILL_LOAD_CODES = void 0;

var _isEmbeddedInProduct = require("../utils/isEmbeddedInProduct");

var _safeLog = require("../utils/safeLog");

var _addAuthToRequest = require("./addAuthToRequest");

var MESSAGES_URI_HEADER = 'X-HubSpot-Messages-Uri';
var XHR_DONE_STATE = 4;
var WIDGET_WILL_LOAD_CODES = [200, 304];
exports.WIDGET_WILL_LOAD_CODES = WIDGET_WILL_LOAD_CODES;
var EXPECTED_WIDGET_WILL_NOT_LOAD_CODES = [204, 404];
exports.EXPECTED_WIDGET_WILL_NOT_LOAD_CODES = EXPECTED_WIDGET_WILL_NOT_LOAD_CODES;

var shouldLoad = function shouldLoad(statusCode) {
    return WIDGET_WILL_LOAD_CODES.indexOf(statusCode) > -1;
};

var requestFailed = function requestFailed(statusCode) {
    return !shouldLoad(statusCode) && EXPECTED_WIDGET_WILL_NOT_LOAD_CODES.indexOf(statusCode) < 0;
};

var noop = function noop() {};
/**
 *
 * @param {object} options
 * @param {string} options.requestUrl
 * @param {number} options.portalId
 * @param {function} loadCallback
 * @param {function} [noopCallback=noop]
 */


function fetchWidgetData(_ref, loadCallback) {
    var requestUrl = _ref.requestUrl,
        portalId = _ref.portalId;
    var noopCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    var request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function() {
        if (request.readyState !== XHR_DONE_STATE) {
            return;
        }

        if (shouldLoad(request.status)) {
            try {
                var json = JSON.parse(request.responseText);
                loadCallback(json);
            } catch (e) {
                (0, _safeLog.warn)('Initial messages API response is invalid');
                noopCallback();
            }

            return;
        }

        if (requestFailed(request.status)) {
            (0, _safeLog.warn)('Initial messages API call failed');
        }

        noopCallback();
    });
    request.open('GET', requestUrl); //if embed script is in an iframe then window.href returns about:srcdoc
    //if so targeting will break so grab the top level href instead

    var href = window.location.href === 'about:srcdoc' ? window.top.location.href : window.location.href;
    request.setRequestHeader(MESSAGES_URI_HEADER, href);

    if ((0, _isEmbeddedInProduct.isEmbeddedInProduct)({
            portalId: portalId
        })) {
        (0, _addAuthToRequest.addAuthToRequest)(request);
    }

    request.send();
}