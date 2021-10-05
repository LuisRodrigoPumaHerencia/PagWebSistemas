"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PostMessageApiClient = void 0;

var _http = require("../requests/http");

var _sentPostMessageTypes = require("./constants/sentPostMessageTypes");

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

var PostMessageApiClient = /*#__PURE__*/ function() {
    function PostMessageApiClient(postMessage) {
        var _this = this;

        _classCallCheck(this, PostMessageApiClient);

        this.makeApiRequest = function(_ref) {
            var data = _ref.data;
            var type = data.type,
                url = data.url,
                requestData = data.data;
            var fullUrl = "/_hcms" + url;

            if (_this.currentRequest && _this.currentRequest.readyState !== _http.DONE_STATE) {
                _this.abortCurrentApiRequest();
            }

            _this.currentRequest = (0, _http.doRequest)(type)(fullUrl, requestData)(function(result, error) {
                if (!error) {
                    _this.postMessage(_sentPostMessageTypes.API_REQUEST_RESULT, {
                        result: 'succeeded',
                        data: result,
                        url: url
                    });
                } else {
                    _this.postMessage(_sentPostMessageTypes.API_REQUEST_RESULT, {
                        result: 'failed',
                        data: error,
                        url: url
                    });
                }
            });
        };

        this.postMessage = postMessage;
        this.currentRequest = null;
    }

    _createClass(PostMessageApiClient, [{
        key: "abortCurrentApiRequest",
        value: function abortCurrentApiRequest() {
            this.currentRequest.abort();
        }
    }]);

    return PostMessageApiClient;
}();

exports.PostMessageApiClient = PostMessageApiClient;