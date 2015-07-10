/**
 * @module trafficUpdates
 * @description
 * Handling traffic updates. See {@link https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Updates.md}.
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single traffic update
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("trafficUpdates"),
    /**
     * Retrieving traffic updates
     * @type {itemsGetRequest}
     */
    get: generate.newGet("trafficUpdates"),
    /**
     * Retrieve a single traffic update
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("trafficUpdates"),
    /**
     * Retrieve severity levels
     * @type {itemsGetRequest}
     */
    getSeverityLevels: generate.newGet("severity"),
};
