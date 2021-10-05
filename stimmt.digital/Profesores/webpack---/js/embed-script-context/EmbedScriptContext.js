"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

var _numberInvariant = require("../invariants/numberInvariant");

var _stringInvariant = require("../invariants/stringInvariant");

var _isEmbeddedInProduct = require("../utils/isEmbeddedInProduct");

var _urls = require("../requests/urls");

var _serializeQueryParameters = require("../utils/serializeQueryParameters");

var _getIframeQueryParams = require("../utils/getIframeQueryParams");

var _isInCMS = require("../utils/isInCMS");

var _getPerfAttributes2 = require("../perf/getPerfAttributes");

var _settingsHelpers = require("../external-api/settingsHelpers");

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

var EmbedScriptContext = /*#__PURE__*/ function() {
    function EmbedScriptContext(properties) {
        _classCallCheck(this, EmbedScriptContext);

        var globalCookieOptOut = properties.globalCookieOptOut,
            hubspotUtk = properties.hubspotUtk,
            hstc = properties.hstc,
            hssc = properties.hssc,
            iFrameDomainOverride = properties.iFrameDomainOverride,
            iframeUuid = properties.iframeUuid,
            isFirstVisitorSession = properties.isFirstVisitorSession,
            messagesEnv = properties.messagesEnv,
            messagesUtk = properties.messagesUtk,
            referrer = properties.referrer,
            portalId = properties.portalId,
            useLocalBuild = properties.useLocalBuild,
            identificationEmail = properties.identificationEmail,
            identificationToken = properties.identificationToken,
            messagesHublet = properties.messagesHublet;
        (0, _stringInvariant.stringInvariant)(iframeUuid, 'iframeUuid');
        (0, _stringInvariant.stringInvariant)(messagesEnv, 'messagesEnv');
        (0, _stringInvariant.stringInvariant)(messagesUtk, 'messagesUtk');
        (0, _numberInvariant.numberInvariant)(portalId, 'portalId');
        this.globalCookieOptOut = globalCookieOptOut;
        this.hubspotUtk = hubspotUtk;
        this.hstc = hstc;
        this.hssc = hssc;
        this.iFrameDomainOverride = iFrameDomainOverride;
        this.iframeUuid = iframeUuid;
        this.isFirstVisitorSession = isFirstVisitorSession;
        this.messagesEnv = messagesEnv;
        this.messagesUtk = messagesUtk;
        this.referrer = referrer;
        this.portalId = portalId;
        this.useLocalBuild = useLocalBuild;
        this.identificationEmail = identificationEmail;
        this.identificationToken = identificationToken;
        this.messagesHublet = messagesHublet;
        this.getIFrameDomain = this.getIFrameDomain.bind(this);
        this.getIFrameSrc = this.getIFrameSrc.bind(this);
        this.getInitialRequestUrl = this.getInitialRequestUrl.bind(this);
    }

    _createClass(EmbedScriptContext, [{
        key: "getIFrameDomain",
        value: function getIFrameDomain() {
            var envString = this.messagesEnv === 'qa' ? 'qa' : '';
            var hubletString = this.messagesHublet === 'na1' || !this.messagesHublet ? '' : "-" + this.messagesHublet;

            if (this.iFrameDomainOverride) {
                return this.iFrameDomainOverride;
            }

            if (this.useLocalBuild) {
                return "https://local" + hubletString + ".hubspot" + envString + ".com";
            }

            return "https://app" + hubletString + ".hubspot" + envString + ".com";
        }
    }, {
        key: "getIFrameSrc",
        value: function getIFrameSrc() {
            var queryParams = (0, _serializeQueryParameters.serializeQueryParameters)((0, _getIframeQueryParams.getIframeQueryParams)({
                messagesUtk: this.messagesUtk,
                hubspotUtk: this.hubspotUtk,
                portalId: this.portalId,
                iframeUuid: this.iframeUuid,
                globalCookieOptOut: this.globalCookieOptOut,
                isFirstVisitorSession: this.isFirstVisitorSession,
                hstc: this.hstc,
                isInCMS: (0, _isInCMS.isInCMS)()
            }));
            return this.getIFrameDomain() + "/conversations-visitor/" + this.portalId + "/threads/utk/" + this.messagesUtk + "?" + queryParams;
        }
    }, {
        key: "getEncodedIdentificationEmail",
        value: function getEncodedIdentificationEmail() {
            var visitorEmail = this.identificationEmail;

            if (!visitorEmail.includes('@')) {
                visitorEmail = decodeURIComponent(visitorEmail);
            }

            return encodeURIComponent(visitorEmail);
        }
    }, {
        key: "getInitialRequestUrl",
        value: function getInitialRequestUrl() {
            if ((0, _isInCMS.isInCMS)()) {
                return (0, _urls.getCMSRequestUrl)({
                    messagesEnv: this.messagesEnv,
                    messagesUtk: this.messagesUtk,
                    hubspotUtk: this.hubspotUtk,
                    portalId: this.portalId,
                    referrer: this.referrer,
                    hstc: this.hstc,
                    hssc: this.hssc,
                    email: this.identificationEmail && this.getEncodedIdentificationEmail(),
                    identificationToken: this.identificationToken
                });
            }

            if ((0, _isEmbeddedInProduct.isEmbeddedInProduct)({
                    portalId: this.portalId
                })) {
                return (0, _urls.getInternalRequestUrl)({
                    messagesHublet: this.messagesHublet,
                    messagesEnv: this.messagesEnv,
                    messagesUtk: this.messagesUtk,
                    portalId: this.portalId
                });
            }

            return (0, _urls.getPublicRequestUrl)({
                messagesHublet: this.messagesHublet,
                messagesEnv: this.messagesEnv,
                messagesUtk: this.messagesUtk,
                hubspotUtk: this.hubspotUtk,
                portalId: this.portalId,
                referrer: this.referrer,
                hstc: this.hstc,
                hssc: this.hssc,
                email: this.identificationEmail && this.getEncodedIdentificationEmail(),
                identificationToken: this.identificationToken
            });
        }
    }, {
        key: "getPerfAttributes",
        value: function getPerfAttributes() {
            var perfAttributes = (0, _getPerfAttributes2.getPerfAttributes)({
                portalId: this.portalId,
                messagesEnv: this.messagesEnv
            });

            if (!(0, _settingsHelpers.shouldLoadImmediately)() || !perfAttributes) {
                return undefined;
            }

            return perfAttributes;
        }
    }]);

    return EmbedScriptContext;
}();

var _default = EmbedScriptContext;
exports.default = _default;
module.exports = exports.default;