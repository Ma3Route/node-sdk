/**
 * @module sse
 */


"use strict";


// own modules
var generate = require("./generate");


// mpdule exports
exports = module.exports = {
    drivingReports: generate.newSSEClientFactory("sseDrivingReports"),
    externalStream: generate.newSSEClientFactory("sseExternalStream"),
    trafficUpdates: generate.newSSEClientFactory("sseTrafficUpdates"),
};
