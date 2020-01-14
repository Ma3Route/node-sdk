/**
 * Tests against the general exported module (./index.js)
 */

"use strict";

// npm-installed modules
var errors = require("common-errors");
var should = require("should");

// own modules
var sdk = require("../index");
var utils = require("./utils");

// module variables
var accessKey = process.env.MA3ROUTE_KEY;
if (!accessKey && !utils.noNetwork) {
    throw new Error("Access key missing");
}
var accessSecret = process.env.MA3ROUTE_SECRET;
if (!accessSecret && !utils.noNetwork) {
    throw new Error("Access secret missing");
}

sdk.utils.setup({
    key: accessKey,
    secret: accessSecret,
});

describe("exported module", function() {
    it("is an object of course", function() {
        should(sdk).be.an.Object();
    });

    it("has exported modules", function() {
        var innerModules = [
            "auth",
            "bannerAdverts",
            "campaigns",
            "drivingReports",
            "externalStream",
            "listedAdverts",
            "news",
            "places",
            "sse",
            "trafficUpdates",
            "users",
            "utils",
            "misc",
            "generate",
            "activations",
        ];
        innerModules.forEach(function(mod) {
            should.strictEqual(sdk[mod], require("../lib/" + mod));
        });
    });

    it("has exported classes", function() {
        var classes = ["Client", "Poller"];
        classes.forEach(function(klass) {
            should(sdk[klass]).be.an.instanceOf(Function);
        });
    });

    it("exports errors module", function() {
        should.strictEqual(sdk.errors, errors);
    });
});
