/**
 * Tests against the Poller class (poller.js)
 */


"use strict";


// built-in modules
var events = require("events");


// npm-installed modules
var should = require("should");


// own modules
var Poller = require("../lib/poller");


// module variables
var noop = function() { };


describe("module:poller", function() {
    it("returns a function as the constructor", function() {
        should(Poller).be.a.Function();
    });

    it("Poller.Poller is just a circular reference", function() {
        should.strictEqual(Poller.Poller, Poller);
    });
});


describe("Poller", function() {
    it("inherits from EventEmitter", function() {
        should(new Poller(noop)).be.an.instanceOf(events.EventEmitter);
    });

    it("does not throw if not passed no options", function() {
        should.doesNotThrow(function() {
            return new Poller(noop);
        });
    });

    it("options.interval sets interval for timer", function(done) {
        this.timeout(500);
        var poller = new Poller(function() {
            poller.stop();
            return done();
        }, { interval: 100 });
    });

    it("options are passed to the callback", function(done) {
        var options;
        var poller = new Poller(function(passedOptions) {
            poller.stop();
            should.strictEqual(passedOptions, options);
            return done();
        }, options);
    });
});


describe("Poller#on", function() {
    it("adds a listener", function(done) {
        var poller = new Poller(function(params, callback) {
            return callback();
        });
        poller.on("message", function() {
            poller.stop();
            return done();
        });
    });

    it("listener is passed arguments from get request", function(done) {
        var err = new Error();
        var items = [ ];
        var meta = [ ];
        var res = { };
        var poller = new Poller(function(params, callback) {
            return callback(err, items, meta, res);
        });
        poller.on("message", function(retErr, retItems, retMeta, retRes) {
            poller.stop();
            should.strictEqual(retErr, err);
            should.strictEqual(retItems, items);
            should.strictEqual(retMeta, meta);
            should.strictEqual(retRes, res);
            return done();
        });
    });
});


describe("Poller#stop", function() {
    it("stops the timer", function(done) {
        var num = 0;
        var poller = new Poller(function(p, callback) {
            return callback(++num);
        }, { interval: 100 });
        poller.on("message", function(retNum) {
            should(retNum).below(2);
            poller.stop();
            return done();
        });
    });

    it("removes all listeners", function() {
        var poller = new Poller(noop);
        poller.on("message", noop);
        poller.stop();
        should(poller.listeners().length).eql(0);
    });
});
