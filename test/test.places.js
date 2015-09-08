/**
 * Tests against the places module
 */


"use strict";


// npm-installed modules
var should = require("should");


// own modules
var places = require("../lib/places");


describe("places", function() {
    var methods = ["getTowns", "getDirections", "createDirections"];

    it("consistent API", function() {
        methods.forEach(function(method) {
            should(places[method]).be.a.Function();
        });
    });
});
