/**
 * Tests against the endpoints
 */


/* eslint-disable */


"use strict";


// npm-installed modules
var _ = require("lodash");
var should = require("should");


// own modules
var sdk = require("../lib/bannerAdverts");
var utils = require("../lib/utils");


// module variables
var createOne = {
    endpoints: [
        "bannerAdverts", "campaigns", "drivingReports", "listedAdverts",
        "trafficUpdates"
    ]
};
var get = {
    endpoints: [
        "bannerAdverts", "campaigns", "drivingReports",
        "drivingReports.getDriveTypes", "listedAdverts", "trafficUpdates"
    ]
};
var getOne = {
    endpoints: [
        "bannerAdverts", "campaigns", "drivingReports", "listedAdverts",
        "trafficUpdates", "trafficUpdates.getSeverityLevels"
    ]
};


function getMethod(reqType, str) {
    var index = str.indexOf(".");
    if (index === -1) {
        return sdk[str][reqType];
    }
    var endpoints = sdk.split(".");
    var method;
    endpoints.forEach(function() {

    });
    return method;
}


describe.skip("endpoints", function() {
    // _.forEach(endpoints, function(reqType, reqTypeName) {
    //     describe(reqTypeName, function() {
    //         reqType.forEach(function(endpoint) {
    //             var method = getMethod(reqTypeName, endpoint);
    //             it(endpoint + "." + reqTypeName, function(done) {
    //                 return method();
    //             });
    //         });
    //     });
    // });
});
