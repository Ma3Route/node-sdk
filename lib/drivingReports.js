/**
 * @module drivingReports
 * @see {@link https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Reports.md}
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    createOne: generate.newCreateOne("drivingReports"),
    get: generate.newGet("drivingReports"),
    getDriveTypes: generate.newGet("driveTypes"),
    getOne: generate.newGetOne("drivingReports"),
};
