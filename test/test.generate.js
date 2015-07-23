/**
 * Tests against the generation module
 */


"use strict";


// npm-installed modules
var should = require("should");


// own modules
var generate = require("../lib/generate");


describe("all generate methods", function() {
    var methods = ["newGet", "newGetOne", "newPostOne", "newCustomPostOne", "newSSEClientFactory"];

    it("return functions", function() {
        methods.forEach(function(method) {
            should(generate[method]()).be.a.Function();
        });
    });
});
