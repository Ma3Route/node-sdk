/**
 * @module sse
 * @description
 * Using Server-Sent Events to continuously receive data.
 * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Server%20Sent%20Events
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
     * Create a new SSE Client for traffic updates
     * @type {SSEClientFactory}
     */
    trafficUpdates: generate.newSSEClientFactory("sseTrafficUpdates"),
};
