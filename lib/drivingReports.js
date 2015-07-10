/**
 * @module drivingReports
 * @description
 * Handling driving reports
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single driving report
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("drivingReports"),
    /**
     * Retrieve driving reports
     * @type {itemsGetRequest}
     */
    get: generate.newGet("drivingReports"),
    /**
     * Retrieve drive types
     * @type {itemsGetRequest}
     */
    getDriveTypes: generate.newGet("driveTypes"),
    /**
     * Retrieve a single driving report
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("drivingReports"),
};
