"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.put = exports.post = exports.get = exports.doRequest = exports.DONE_STATE = void 0;
var DONE_STATE = 4;
exports.DONE_STATE = DONE_STATE;

var requestFailed = function requestFailed(statusCode) {
    return statusCode >= 300;
};

var doRequest = function doRequest(method) {
    return function(url, body) {
        return function(callback) {
            var request = new XMLHttpRequest();
            request.addEventListener('readystatechange', function() {
                if (request.readyState !== DONE_STATE) {
                    return;
                }

                try {
                    var json = JSON.parse(request.responseText);

                    if (!requestFailed(request.status)) {
                        callback(json);
                    } else {
                        callback(null, json);
                    }
                } catch (e) {
                    callback(null, 'Invalid api response');
                }
            });
            request.open(method, url);
            request.send(body);
            return request;
        };
    };
};

exports.doRequest = doRequest;
var get = doRequest('GET');
exports.get = get;
var post = doRequest('POST');
exports.post = post;
var put = doRequest('PUT');
exports.put = put;