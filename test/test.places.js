/**
 * Tests against the places module
 */

"use strict";

// npm-installed modules
var should = require("should");

// own modules
var places = require("../lib/places");
var utils = require("./utils");

describe("places", function() {
    var methods = [
        "getAdvertLocations",
        "getCountries",
        "getDirections",
        "getPlaces",
        "getTowns",
        "createDirections",
    ];

    it("consistent API", function() {
        methods.forEach(function(method) {
            should(places[method]).be.a.Function();
        });
    });

    describe("#getAdvertLocations", function() {
        this.timeout(utils.defaults.timeout);

        it("works", function(done) {
            if (utils.noNetwork) return this.skip();
            places.getAdvertLocations(function(error, body) {
                should(error).not.be.ok();
                should(body).be.an.Array();
                return done();
            });
        });
    });
});
