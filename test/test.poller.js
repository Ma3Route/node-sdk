/**
 * Tests against the Poller class (poller.js)
 */

"use strict";

// built-in modules
var domain = require("domain");
var events = require("events");

// npm-installed modules
var should = require("should");

// own modules
var Poller = require("../lib/poller");
var utils = require("../lib/utils");

// module variables
var setup = utils.setup();
var noop = function() {};

describe("PollerTestWrapper", function() {
    before(function() {
        utils.setup({
            poller: {
                interval: 10,
            },
        });
    });

    after(function() {
        utils.setup(setup);
    });

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

        it("has own interval automatically", function(done) {
            this.timeout(setup.poller.interval * 3);
            var times = [];
            var testSetup = utils.setup();
            utils.setup(setup);
            var poller = new Poller(function(params, callback) {
                return callback(null, [Date.now()]);
            });
            poller.on("message", function(r) {
                times.push(r[0]);
                if (times.length === 2) {
                    poller.stop();
                    utils.setup(testSetup);
                    should(times[1]).be.approximately(times[0], 6000);
                    return done();
                }
            });
            poller.start();
        });

        it("options.interval sets interval for timer", function(done) {
            this.timeout(500);
            var poller = new Poller(
                function() {
                    poller.stop();
                    return done();
                },
                { interval: 100 }
            );
            poller.start();
        });

        it("options.params are passed to the callback", function(done) {
            var options = { params: {} };
            var poller = new Poller(function(params) {
                poller.stop();
                should.deepEqual(params, options.params);
                return done();
            }, options);
            poller.start();
        });

        it("calls options.params if it is a function", function(done) {
            var tracker = { myname: "gocho" };
            var options = {
                params: function() {
                    return tracker;
                },
            };
            var poller = new Poller(function(params) {
                poller.stop();
                should.deepEqual(params, tracker);
                return done();
            }, options);
            poller.start();
        });

        it("sets the lastreadId automatically", function(done) {
            var id = 1;
            var poller = new Poller(
                function(params, callback) {
                    should(params.lastreadId).eql(id++);
                    if (id === 5) {
                        poller.stop();
                        return done();
                    }
                    return callback(null, [{ id: id }]);
                },
                { params: { lastreadId: id }, interval: 10 }
            );
            poller.start();
        });

        it("uses the latest ID as the lastreadId", function(done) {
            var id = 1;
            var poller = new Poller(
                function(params, callback) {
                    should(params.lastreadId).eql(id++);
                    if (id === 5) {
                        poller.stop();
                        return done();
                    }
                    var items = [{ id: id }, { id: id - 1 }];
                    if (id % 2 === 0) {
                        items = [{ id: id - 1 }, { id: id }];
                    }
                    return callback(null, items);
                },
                { params: { lastreadId: id }, interval: 10 }
            );
            poller.start();
        });

        it("allows an asynchronous params function", function(done) {
            var tracker = { track: "no one" };
            var options = {
                params: function params(amDone) {
                    return amDone(tracker);
                },
            };
            var poller = new Poller(function(params, callback) {
                poller.stop();
                should.deepEqual(params, tracker);
                callback(null, []);
                return done();
            }, options);
            poller.start();
        });

        it("fires request only if there's none pending", function(done) {
            var pending = false;
            var poller = new Poller(
                function(params, callback) {
                    should(pending).eql(false);
                    pending = true;
                    setTimeout(function() {
                        poller.stop();
                        callback(null, []);
                        return done();
                    }, 500);
                },
                { interval: 10 }
            );
            poller.start();
        });
    });

    describe("Poller#on", function() {
        it("adds a listener", function(done) {
            var poller = new Poller(function(params, callback) {
                return callback(null, "data");
            });
            poller.on("message", function() {
                poller.stop();
                return done();
            });
            poller.start();
        });

        it("event.message: data is passed", function(done) {
            var items = [{ id: 1 }];
            var meta = [];
            var res = {};
            var poller = new Poller(function(params, callback) {
                return callback(null, items, meta, res);
            });
            poller.on("message", function(retItems, retMeta, retRes) {
                poller.stop();
                should.strictEqual(retItems, items);
                should.strictEqual(retMeta, meta);
                should.strictEqual(retRes, res);
                return done();
            });
            poller.start();
        });

        it("event.error: error is passed", function(done) {
            var error = new Error();
            var poller = new Poller(function(params, callback) {
                return callback(error);
            });
            poller.on("error", function(err) {
                poller.stop();
                should.strictEqual(err, error);
                return done();
            });
            poller.start();
        });

        it.skip("event.error: throws an error to the process if no listener", function(done) {
            /**
             * See http://www.adaltas.com/blog/2013/03/27/test-uncaughtException-error-mocha/
             */
            var poller = new Poller(function(params, callback) {
                return callback(new Error());
            });
            var d = domain.create();
            d.on("error", function(err) {
                poller.stop();
                should(err).be.ok();
                d.dispose();
                return done();
            });
            d.run(function() {
                poller.start();
            });
        });
    });

    describe("Poller#pause", function() {
        it("pauses the timer", function(done) {
            // start the poller and let it emit the 'message' event
            // only one time before pausing it. Wait for some couple
            // of seconds to see if the getRequest func is actually not fired
            // again.
            var firstMessage = true;
            var poller = new Poller(
                function(p, callback) {
                    poller.pause();
                    return callback(null, [{ id: 1 }]);
                },
                { interval: 100 }
            );
            poller.on("message", function() {
                should(firstMessage).equal(true);
                firstMessage = false;
                setTimeout(function() {
                    poller.stop();
                    return done();
                }, 500);
            });
            poller.start();
        });
    });

    describe("Poller#resume", function() {
        it("resumes a 'paused' poller", function(done) {
            // Start a poller. Once it fires the getRequest func the first
            // time and emits a 'message' event, pause it and mark so.
            // Set a timeout that resumes the poller, once on which emitting
            // the 'message' event again, we can be sure it has resumed.
            var wasPaused = false;
            var poller = new Poller(
                function(p, callback) {
                    return callback(null, [{ id: 1 }]);
                },
                { interval: 100 }
            );
            poller.on("message", function() {
                if (wasPaused) {
                    poller.stop();
                    return done();
                }
                poller.pause();
                wasPaused = true;
                setTimeout(function() {
                    poller.resume();
                }, 400);
            });
            poller.start();
        });
    });

    describe("Poller#stop", function() {
        it("stops the timer", function(done) {
            var poller = new Poller(
                function(p, callback) {
                    return callback(null, [{ id: 1 }]);
                },
                { interval: 100 }
            );
            poller.on("message", function() {
                poller.stop();
                return done();
            });
            poller.start();
        });

        it("removes all listeners", function(done) {
            var poller = new Poller(function(params, callback) {
                poller.stop();
                should(poller.listeners().length).eql(0);
                callback(null, []);
                return done();
            });
            poller.on("message", noop);
            poller.start();
        });
    });
});
