"use strict";
'use es6';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWidgetDataResponseType = getWidgetDataResponseType;
var TYPE = '@type';

function getWidgetDataResponseType(widgetData) {
    return widgetData && typeof widgetData === 'object' ? widgetData[TYPE] : undefined;
}