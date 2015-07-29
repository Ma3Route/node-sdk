/**
 * Tests against the general exported module (./index.js)
 */


"use strict";


// npm-installed modules
var errors = require("common-errors");
var should = require("should");


// own modules
var sdk = require("../index");


describe("exported module", function() {
    it("is an object of course", function() {
        should(sdk).be.an.Object();
    });

    it("has exported modules", function() {
        var innerModules = [
            "auth", "bannerAdverts", "drivingReports", "externalStream",
            "listedAdverts", "news", "places", "sse", "trafficUpdates",
            "users", "utils", "misc",
        ];
        innerModules.forEach(function(mod) {
            should.strictEqual(sdk[mod], require("../lib/" + mod));
        });
    });

    it("has exported classes", function() {
        var classes = [
            "Client", "Poller",
        ];
        classes.forEach(function(klass) {
            should(sdk[klass]).be.an.instanceOf(Function);
        });
    });

    it("exports errors module", function() {
        should.strictEqual(sdk.errors, errors);
    });
});
