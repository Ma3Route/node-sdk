/**
 * @module drivingReports
 * @description
 * Handling driving reports
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single driving report
     * @type {itemsPostOneRequest}
     */
    createOne: generate.newPostOne("drivingReports", paramsConfig.drivingReports.create),
    /**
     * Delete a single driving report
     * @type {itemsPostOneRequest}
     */
    deleteOne: generate.newCustomPostOne("drivingReports", {
        delete: true,
    }, paramsConfig.drivingReports.delete),
    /**
     * Retrieve driving reports
     * @type {itemsGetRequest}
     */
    get: generate.newGet("drivingReports", paramsConfig.drivingReports.get),
    /**
     * Retrieve drive types
     * @type {itemsGetRequest}
     */
    getDriveTypes: generate.newGet("driveTypes", []),
    /**
     * Retrieve a single driving report
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("drivingReports", paramsConfig.drivingReports.get),
};
