"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isEmbeddedInProduct = isEmbeddedInProduct;
var PORTAL_53 = 53;
var BET_PORTAL_53 = 99535353;
var IN_APP_PATTERN = /^(?:app|local)\.hubspot(?:qa)?\.com$/;
var IN_APP_PRICING_PAGE_PATTERN = /(?:pricing)\/[0-9]+/;
var PRICING_SUBSTRING = 'pricing';

function isEmbeddedInProduct(_ref) {
    var portalId = _ref.portalId,
        _ref$hostname = _ref.hostname,
        hostname = _ref$hostname === void 0 ? window.location.hostname : _ref$hostname,
        _ref$pathname = _ref.pathname,
        pathname = _ref$pathname === void 0 ? window.location.pathname : _ref$pathname;
    var isPublicPricingPage = pathname.indexOf(PRICING_SUBSTRING) !== -1 && !IN_APP_PRICING_PAGE_PATTERN.test(pathname);

    if (IN_APP_PATTERN.test(hostname) && !isPublicPricingPage) {
        if (hostname.indexOf('qa') !== -1) {
            return portalId === PORTAL_53 || portalId === BET_PORTAL_53;
        }

        return portalId === PORTAL_53;
    }

    return false;
}