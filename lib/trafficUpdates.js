/**
 * @module trafficUpdates
 * @see {@link https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Updates.md}
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    createOne: generate.newCreateOne("trafficUpdates"),
    get: generate.newGet("trafficUpdates"),
    getOne: generate.newGetOne("trafficUpdates"),
    getSeverityLevels: generate.newGet("severity"),
};
