/**
 * @module sse
 * @description
 * Using Server-Sent Events to continuously receive data.
 */


"use strict";


// own modules
var generate = require("./generate");


// mpdule exports
exports = module.exports = {
    /**
     * Create a new SSE client for driving reports
     * @type {SSEClientFactory}
     */
    drivingReports: generate.newSSEClientFactory("sseDrivingReports"),
    /**
     * Create a new SSE Client for the external stream
     * @type {SSEClientFactory}
     */
    externalStream: generate.newSSEClientFactory("sseExternalStream"),
    /**
     * Create a new SSE Client for traffic updates
     * @type {SSEClientFactory}
     */
    trafficUpdates: generate.newSSEClientFactory("sseTrafficUpdates"),
};
