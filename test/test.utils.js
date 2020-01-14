/**
 * Tests against the route utilities (utils.js)
 */

"use strict";

// npm-installed modules
var _ = require("lodash");
var errors = require("common-errors");
var request = require("request");
var should = require("should");
var URI = require("urijs");

// own modules
var config = _.cloneDeep(require("../config"));
var utils = require("../lib/utils");

describe("utils.request", function() {
    it("is a function that configures request with defaults", function() {
        var req = utils.request();
        should.deepEqual(req, request.defaults(config));
    });
});

describe("utils.setup", function() {
    it("returns settings", function() {
        should(utils.setup()).be.an.Object();
        should(Object.keys(utils.setup())).containDeep(Object.keys(config));
    });

    it("sets up the SDK settings", function() {
        var settings = { testVar: 1 };
        utils.setup(settings);
        should(utils.setup().testVar).eql(settings.testVar);
    });

    it("merges all settings", function() {
        var newSettings = { request: { testVar: false } };
        utils.setup(newSettings);
        should(utils.setup().request.json).not.be.Undefined();
        should(utils.setup().request.testVar).eql(false);
    });

    it("does not pass the same/actual reference to the settings", function() {
        var setup = utils.setup();
        var anothersetup1 = utils.setup({ testVar: "ian" });
        var anothersetup2 = utils.setup();
        should.notStrictEqual(anothersetup1, setup);
        should.notStrictEqual(anothersetup2, setup);
    });
});

describe("utils.url", function() {
    it("accepts zero parameters", function() {
        should(utils.url()).be.an.instanceOf(URI);
    });

    it("returns URIjs instances for endpoints", function() {
        var endpoints = [
            "listedAdverts",
            "bannerAdverts",
            "driveTypes",
            "drivingReports",
            "news",
            "places",
            "towns",
            "trafficUpdates",
            "users",
            "severity",
            "sseTrafficUpdates",
            "sseDrivingReports",
            "sseExternalStream",
            "contactUs",
            "externalStream",
            "directions",
            "countries",
        ];
        endpoints.forEach(function(endpoint) {
            should(utils.url(endpoint)).be.an.instanceOf(URI);
        });
    });

    it("never returns same reference to an URI object", function() {
        var ref1 = utils.url();
        var ref2 = utils.url();
        should.notStrictEqual(ref1, ref2);
    });

    it("allows a proxy to be passed", function() {
        var proxy = "http://someproxy.io";
        var url1 = utils.url(null, { proxy: proxy });
        should(url1.toString()).containEql(proxy);
        proxy = "http://anotherproxy.io";
        var url2 = utils.url("trafficUpdates", { proxy: proxy });
        should(url2.toString()).containEql(proxy);
        proxy = "https://mustbeproxy.io";
        var url3 = utils.url({ proxy: proxy });
        should(url3.toString()).containEql(proxy);
    });

    it("allows an arbitrary endpoint to be used", function() {
        var endpoint = "arbitrary-endpoint";
        var url = utils.url(endpoint);
        should(url).be.an.instanceOf(URI);
        var segments = url.segment();
        should(segments[segments.length - 1]).equal(endpoint);
    });
});

describe("utils.shuffleArray", function() {
    it("returns an array", function() {
        should(utils.shuffleArray([1, 2])).be.an.Array();
    });

    it("returns same number of elements in array", function() {
        var array = [1, 2, 3, 4, 5];
        var shuffledArray = utils.shuffleArray(array);
        should(array.length).equal(shuffledArray.length);
    });

    it("changes the original array", function() {
        var array = [1, 2, 3, 4, 5];
        var shuffledArray = utils.shuffleArray(array);
        should.strictEqual(shuffledArray, array);
    });

    it("does not throw if array is empty", function() {
        should.doesNotThrow(function() {
            utils.shuffleArray([]);
        });
    });

    it("actually shuffles the items", function() {
        var array = [1, 2, 3, 4, 5];
        var sameArray = array.slice();
        should.notDeepEqual(utils.shuffleArray(array), sameArray);
    });
});

describe("utils.createTimestamp", function() {
    it("returns a Number", function() {
        var timestamp = utils.createTimestamp();
        should(timestamp).be.a.Number();
    });
});

describe("utils.sortKeys", function() {
    var obj = { b: "b", a: "a", d: "d", c: "d" };
    var keys;

    before(function() {
        keys = utils.sortKeys(obj);
    });

    it("returns an array", function() {
        should(keys).be.an.Array();
    });

    it("returns all keys", function() {
        should(keys.length).eql(4);
    });

    it("sorts the keys", function() {
        should.deepEqual(keys, ["a", "b", "c", "d"]);
    });
});

describe("utils.parseResponse", function() {
    var codes = {
        info: [100, 101],
        ok: [200, 206],
        clientError: [400, 417],
        serverError: [500, 505],
    };

    function eachCode(limits, fn) {
        for (var code = limits[0], end = limits[1]; code <= end; code++) {
            fn(code);
        }
    }

    it("adds property info for 1XX status codes", function() {
        eachCode(codes.info, function(code) {
            var res = { statusCode: code };
            res = utils.parseResponse(res);
            should(res.info).be.ok();
            should.equal(res.info, 1);
        });
    });

    it("adds property ok for 2XX status codes", function() {
        eachCode(codes.ok, function(code) {
            var res = { statusCode: code };
            res = utils.parseResponse(res);
            should(res.ok).be.ok();
            should.equal(res.ok, 2);
        });
    });

    it("adds properties clientError and error for 4XX status codes", function() {
        eachCode(codes.clientError, function(code) {
            var res = { statusCode: code };
            res = utils.parseResponse(res);
            should(res.clientError).be.ok();
            should(res.error).be.ok();
            should.equal(res.clientError, 4);
        });
    });

    it("adds properties serverError and error for 5XX status codes", function() {
        eachCode(codes.serverError, function(code) {
            var res = { statusCode: code };
            res = utils.parseResponse(res);
            should(res.serverError).be.ok();
            should(res.error).be.ok();
            should.equal(res.serverError, 5);
        });
    });

    it("always add an ErrorClass for constructing errors", function() {
        [codes.clientError, codes.serverError].forEach(function(codesCategory) {
            eachCode(codesCategory, function(code) {
                var res = { statusCode: code };
                res = utils.parseResponse(res);
                should(res.ErrorClass).be.a.Function();
            });
        });
        // using body
        var sampleRes = utils.parseResponse({ body: { success: false } });
        should(sampleRes.ErrorClass).be.a.Function();
        sampleRes = utils.parseResponse({ body: null });
        should(sampleRes.ErrorClass).be.a.Function();
    });

    describe("sugar", function() {
        function parsedRes(code) {
            var res = { statusCode: code };
            return utils.parseResponse(res);
        }

        it("201: adds prop .created", function() {
            should.equal(parsedRes(201).created, 201);
        });

        it("202: adds prop .accepted", function() {
            should.equal(parsedRes(202).accepted, 202);
        });

        it("204: adds prop .noContent", function() {
            should.equal(parsedRes(204).noContent, 204);
        });

        it("400: adds prop .badRequest", function() {
            should.equal(parsedRes(400).badRequest, 400);
        });

        it("401: adds prop .unauthorized and AuthenticationRequiredError", function() {
            var res = parsedRes(401);
            should.equal(res.unauthorized, 401);
            should.strictEqual(
                res.ErrorClass,
                errors.AuthenticationRequiredError
            );
        });

        it("403: adds prop .forbidden and NotPermittedError", function() {
            var res = parsedRes(403);
            should.equal(res.forbidden, 403);
            should.strictEqual(res.ErrorClass, errors.NotPermittedError);
        });

        it("404: adds prop .notFound and NotFoundError", function() {
            var res = parsedRes(404);
            should.equal(res.notFound, 404);
            should.strictEqual(res.ErrorClass, errors.NotFoundError);
        });

        it("406: adds prop .notAcceptable", function() {
            should.equal(parsedRes(406).notAcceptable, 406);
        });

        it("500: adds prop .internalServerError", function() {
            should.equal(parsedRes(500).internalServerError, 500);
        });
    });

    it("marks response as a client error if body.success === false", function() {
        var res = {
            statusCode: 200,
            body: { success: false },
        };
        res = utils.parseResponse(res);
        should.equal(res.error, 4);
    });

    it("marks response as server error if body is null/''/undefined", function() {
        var res = [
            utils.parseResponse({ statusCode: 200, body: null }),
            utils.parseResponse({ statusCode: 200, body: "" }),
            utils.parseResponse({ statusCode: 200, body: undefined }),
        ];
        res.forEach(function(aRes) {
            should.equal(aRes.error, 5, "fails for '" + aRes.body + "'");
        });
    });
});

describe("utils.passResponse", function() {
    var error = new Error("some random error");
    var response = { statusCode: 200, body: { data: "data", meta: "meta" } };

    it("returns a function", function() {
        should(utils.passResponse(function() {})).be.a.Function();
    });

    it("returns a callback that can be passed to the requests module", function(done) {
        var callback = utils.passResponse(function() {
            return done();
        });
        callback(null, response, response.body);
    });

    it("returns function that passes to callback some arguments", function(done) {
        var callback = utils.passResponse(function(err, data, meta, res) {
            should(err).not.be.ok();
            should.strictEqual(data, response.body.data);
            should.strictEqual(meta, response.body.meta);
            should.strictEqual(res, response);
            return done();
        });
        callback(null, response, response.body);
    });

    it("passes IOError if error encountered in sending request", function(done) {
        var callback = utils.passResponse(function(err) {
            should(err).be.ok();
            should(err).be.an.instanceOf(errors.io.IOError);
            return done();
        });
        callback(error);
    });

    it("actually parses the responses", function(done) {
        var callback = utils.passResponse(function(err, body, meta, res) {
            should(err).be.an.instanceOf(errors.NotFoundError);
            should(res.notFound).be.ok();
            return done();
        });
        callback(null, { statusCode: 404 });
    });

    it("error may be passed through the body instead of status code", function(done) {
        var callback = utils.passResponse(function(err, data, meta, res) {
            should(err).be.an.instanceOf(errors.HttpStatusError);
            should(res.error).be.ok();
            should(res.ErrorClass).be.a.Function();
            return done();
        });
        callback(null, { body: { success: false } });
    });

    it("uses a predefined string if falsy body is received", function(done) {
        var callback = utils.passResponse(function(err, data, meta, res) {
            if (data === "done") {
                return done();
            }
            should(err).be.an.instanceOf(errors.HttpStatusError);
            should(err.message)
                .be.a.String()
                .and.containEql("empty");
            should(res.error).be.ok();
            should(res.ErrorClass).be.a.Function();
        });
        callback(null, { body: null });
        callback(null, { body: undefined });
        callback(null, { body: "" });
        callback(null, {}, { data: "done" });
    });
});

describe("utils.addQueries", function() {
    var excludes = ["secret", "key", "proxy"];

    it("returns an instance of URIjs", function() {
        var url = utils.url();
        should(utils.addQueries(url, { qs: "qs" })).be.an.instanceOf(URI);
    });

    it("adds keys in object as querystring", function() {
        var expected = "?qs=querystring";
        var params = { qs: "querystring" };
        var url = utils.url();
        url = utils.addQueries(url, params);
        var stringUrl = url.toString();
        var actual = stringUrl.substring(stringUrl.indexOf("?"));
        should.equal(actual, expected);
    });

    it("iterates over all params", function() {
        var expected = [
            "?qs=querystring&name=gocho",
            "?name=gocho&qs=querystring",
        ];
        var params = { qs: "querystring", name: "gocho" };
        var url = utils.url();
        url = utils.addQueries(url, params);
        var stringUrl = url.toString();
        var actual = stringUrl.substring(stringUrl.indexOf("?"));
        should(expected).containEql(actual);
    });

    it("acts on the same URI object passed", function() {
        var params = {};
        var url = utils.url();
        var modifiedUrl = utils.addQueries(url, params);
        should.strictEqual(modifiedUrl, url);
    });

    it("replaces already added params", function() {
        var uri = utils.url();
        utils.addQueries(uri, { added: true });
        utils.addQueries(uri, { added: false });
        var params = uri.search(true);
        should.equal(params.added, "false");
    });

    it("automatically excludes keys: " + excludes, function() {
        var uri = utils.url();
        excludes.forEach(function(exclude) {
            var queries = {};
            queries[exclude] = "some damn content";
            utils.addQueries(uri, queries);
            var params = uri.search(true);
            should(params[exclude]).be.Undefined();
        });
    });

    it("allows the excludes be NOT excluded", function() {
        var uri = utils.url();
        excludes.forEach(function(exclude) {
            var queries = {};
            queries[exclude] = "some damn content";
            utils.addQueries(uri, queries, false);
            var params = uri.search(true);
            should.equal(params[exclude], queries[exclude]);
        });
    });
});

describe("utils.allowOptionalParams", function() {
    it("returns an object", function() {
        var args = utils.allowOptionalParams({}, function() {});
        should(args).be.an.Object();
    });

    it("args.params is an Object of the parameters", function() {
        var params = { isparam: true };
        var args = utils.allowOptionalParams(params, function() {});
        should.strictEqual(args.params, params);
    });

    it("args.callback is the callback function", function() {
        var callback = function() {
            return "isCallback";
        };
        var args = utils.allowOptionalParams({}, callback);
        should.strictEqual(args.callback, callback);
    });

    it("params may not be passed", function() {
        should.doesNotThrow(function() {
            utils.allowOptionalParams(function() {});
        });
    });

    it("returns empty object as args.params if params is not passed", function() {
        var args = utils.allowOptionalParams(function() {});
        should.deepEqual(args.params, {});
    });

    it("returns callback as args.callback if params is not passed", function() {
        var callback = function() {
            return "isCallback";
        };
        var args = utils.allowOptionalParams(callback);
        should.strictEqual(args.callback, callback);
    });
});

describe("utils.setProxy", function() {
    it("should set url to be used by SDK in making requests", function() {
        var proxy = "http://mugo.com/007";
        utils.setProxy(proxy);
        should.equal(utils.getProxy(), proxy);
    });

    it("should return the just set url", function() {
        var proxy = "http://wow.io";
        var retProxy = utils.setProxy(proxy);
        should.equal(retProxy, proxy);
    });
});

describe("utils.getProxy", function() {
    it("should return the currently set proxy", function() {
        var proxy = utils.getProxy();
        should(utils.url().toString()).containEql(proxy);
    });
});

describe("utils.getOptions", function() {
    it("returns empty object if no options are added", function() {
        var ret = utils.getOptions({}, []);
        should.deepEqual(ret, {});
    });

    it("returns an object with the options", function() {
        var proxy = "some proxy";
        var ret = utils.getOptions({ proxy: proxy }, ["proxy"]);
        should(ret).be.an.Object();
        should.deepEqual(ret, { proxy: proxy });
    });

    it("allows an array of sources", function() {
        var source1 = { a: "a" };
        var source2 = { b: "b" };
        var ret = utils.getOptions([source1, source2], ["a", "b"]);
        should(ret).be.an.Object();
        should.deepEqual(ret, { a: "a", b: "b" });
    });

    it("options in following sources in array supercede the preceding", function() {
        var source1 = { a: "a", b: "b" };
        var source2 = { a: "z", b: "y" };
        var ret = utils.getOptions([source1, source2], ["a", "b"]);
        should.equal(ret.a, source2.a);
        should.equal(ret.b, source2.b);
    });

    it("allows a destination object", function() {
        var dest = {};
        var source = { red: "green" };
        utils.getOptions(source, ["red"], dest);
        should(dest.red).eql("green");
    });

    it("ignores null and undefined sources", function() {
        var sources = [null, undefined];
        should.doesNotThrow(function() {
            utils.getOptions(sources, ["a"]);
        });
    });
});

describe("utils.getURIOptions", function() {
    it("returns options applicable to URI", function() {
        var source = { proxy: "some proxy", notneeded: true };
        var ret = utils.getURIOptions(source);
        should.equal(ret.proxy, source.proxy);
        should(ret.notneeded).be.Undefined();
    });
});

describe("utils.getAuthOptions", function() {
    it("returns options applicable to Auth", function() {
        var source1 = { secret: "some secret", notneeded: true };
        var source2 = { key: "some key" };
        var ret1 = utils.getAuthOptions(source1);
        var ret2 = utils.getAuthOptions([source1, source2]);
        should.equal(ret1.secret, source1.secret);
        should.equal(ret2.secret, source1.secret);
        should.equal(ret2.key, source2.key);
        should(ret2.notneeded).be.Undefined();
    });
});

describe("utils.getPollerOptions", function() {
    it("returns options applicable to Poller class", function() {
        var source1 = { interval: 1000, proxy: "p", secret: "s" };
        var ret1 = utils.getPollerOptions([source1, null]);
        should.equal(ret1.interval, source1.interval);
        should(ret1.proxy).be.Undefined();
        should(ret1.secret).be.Undefined();
    });
});

describe("utils.removeOptions", function() {
    it("deletes keys", function() {
        var obj = { a: "b", c: "d" };
        utils.removeOptions([obj], ["a"]);
        should(obj.a).be.Undefined();
    });

    it("allows a single key", function() {
        var obj = { i: "i" };
        should.doesNotThrow(function() {
            utils.removeOptions([obj], "i");
        });
    });
});

describe("utils.removeURIOptions", function() {
    it("deletes the keys applicable to URI", function() {
        var params = { proxy: "some proxy" };
        utils.removeURIOptions(params);
        should(params.proxy).be.Undefined();
    });

    it("allows arguments splat", function() {
        var arg1 = { proxy: "proxy" };
        var arg2 = { proxy: "proxy" };
        utils.removeURIOptions(arg1, arg2);
        should(arg1.proxy).be.Undefined();
        should(arg2.proxy).be.Undefined();
    });

    it("leaves other arguments untouched", function() {
        var params = { proxy: "proxy", limit: 70 };
        utils.removeURIOptions(params);
        should.equal(params.limit, 70);
    });
});

describe("utils.removeAuthOptions", function() {
    it("deletes the keys applicable to URI", function() {
        var params = { key: "some proxy", secret: "some secret" };
        utils.removeAuthOptions(params);
        should(params.key).be.Undefined();
        should(params.secret).be.Undefined();
    });

    it("allows arguments splat", function() {
        var arg1 = { key: "key" };
        var arg2 = { secret: "secret" };
        utils.removeAuthOptions(arg1, arg2);
        should(arg1.key).be.Undefined();
        should(arg2.secret).be.Undefined();
    });

    it("leaves other arguments untouched", function() {
        var params = { secret: "secret", limit: 70 };
        utils.removeAuthOptions(params);
        should.equal(params.limit, 70);
    });
});

describe("utils.pickParams", function() {
    beforeEach(function() {
        utils.setup({ enforce_params_filter: true }); // eslint-disable-line camelcase
    });

    it("picks out parameters", function() {
        var params = { i: "i", j: "j", k: "k" };
        var picked = utils.pickParams(params, ["i", "k"]);
        should.equal(picked.i, params.i);
        should(picked.j).be.Undefined();
        should.equal(picked.k, params.k);
    });

    it("does not filter if settings forbid it", function() {
        utils.setup({ enforce_params_filter: false }); // eslint-disable-line
        var params = { i: "i", j: "j" };
        var picked = utils.pickParams(params, ["i"]);
        should.equal(picked.j, params.j);
    });

    it("automatically converts decamelizes queries", function() {
        var params = { deCamelize: "please" };
        var picked = utils.pickParams(params, ["de_camelize"]);
        should.equal(picked.de_camelize, params.deCamelize);
    });

    it("does not manipulate the unpicked params", function() {
        var original = { i: "i" };
        var picked = utils.pickParams(original, ["i"]);
        should.notStrictEqual(picked, original);
    });
});

describe("utils.collectPages", function() {
    it("collects all pages", function(done) {
        var firstRun = true;
        var cycles = 3;
        utils.collectPages(
            function(lastReadId, next) {
                if (firstRun) should(lastReadId).eql(0);
                else should(lastReadId).be.above(0);
                firstRun = false;

                should(next).be.a.Function();

                if (cycles === 0) return next(null, []);
                cycles--;
                return next(null, [{ id: cycles + 1 }]);
            },
            function(error, items) {
                should(error).not.be.ok();
                should(items).be.an.Array();
                should(items.length).eql(3);
                should(items).deepEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
                return done();
            }
        );
    });
});
