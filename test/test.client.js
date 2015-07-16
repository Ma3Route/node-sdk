/**
 * Tests against the client class (client.js)
 */


"use strict";


// npm-installed modules
var _ = require("lodash");
var should = require("should");


// own modules
var Client = require("../lib/client");


describe("module:client", function() {
    it("returns a function as the constructor", function() {
        should(Client).be.a.Function();
    });

    it("Client.Client is just a circular reference", function() {
        should.strictEqual(Client.Client, Client);
    });
});


describe("Client", function() {
    it("does not throw if passed no options", function() {
        should.doesNotThrow(function() {
            return new Client();
        });
    });

    it("returns the all the module functions as instance method", function() {
        var client = new Client();
        var sdk = require("../index");
        var excludes = ["Client", "auth", "utils"];
        for (var moduleName in sdk) {
            // ignore some inner modules
            if (_.includes(excludes, moduleName)) {
                continue;
            }
            should(client[moduleName]).be.an.Object();
            // the module
            var mod = sdk[moduleName];
            for (var funcName in mod) {
                if (typeof mod[funcName] === "function") {
                    should(client[moduleName][funcName]).be.a.Function();
                }
            }
        }
    });
});
