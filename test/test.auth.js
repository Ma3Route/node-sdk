/**
 * Tests against the authentication module
 */


"use strict";


// npm-installed modules
var errors = require("common-errors");
var should = require("should");
var URI = require("URIjs");


// own modules
var auth = require("../lib/auth");
var utils = require("../lib/utils");


describe("auth.generateHash", function() {
    it("returns a URIjs instance", function() {
        var uri = utils.url();
        var signedUri = auth.addSignature("key", "secret", uri);
        should(signedUri).be.an.instanceOf(URI);
    });

    it("returns the same URIjs instance passed", function() {
        var uri = utils.url();
        var signedUri = auth.addSignature("key", "secret", uri);
        should.strictEqual(signedUri, uri);
    });

    it("adds signature to query", function() {
        var signedUri = auth.addSignature("key", "secret", utils.url());
        should(signedUri.hasQuery("signature")).be.ok;
    });

    it("adds apikey to query", function() {
        var signedUri = auth.addSignature("key", "secret", utils.url());
        should(signedUri.hasQuery("apikey")).be.ok;
    });

    it("generate deterministic hashs", function() {
        var uri = utils.url();
        var sameUri = uri.clone();
        var key = "key";
        var secret = "secret";
        var signedUri1 = auth.addSignature(key, secret, uri);
        var signedUri2 = auth.addSignature(key, secret, sameUri);
        should.equal(signedUri1.toString(), signedUri2.toString());
    });

    it("ignores the original order of the query parameters", function() {
        var uri1 = utils.url();
        utils.addQueries(uri1, { name: "mugo", qs: "querystring" });
        var uri2 = utils.url();
        utils.addQueries(uri2, { qs: "querystring", name: "mugo" });
        var key = "some key";
        var secret = "secret";
        var signedUri1 = auth.addSignature(key, secret, uri1);
        var signedUri2 = auth.addSignature(key, secret, uri2);
        should.equal(signedUri1.search(true).signature,
            signedUri2.search(true).signature);
    });

    it("removes signature if exists", function() {
        var uri = utils.url();
        var fakeSig = "signed by me";
        uri.addQuery("signature", fakeSig);
        auth.addSignature("key", "secret", uri);
        var params = uri.search(true);
        should(params.signature).not.be.an.Array;
    });

    it("removes key if exists", function() {
        var uri = utils.url();
        var key = "some key";
        uri.addQuery("apikey", key);
        auth.addSignature("another key", "secret", uri);
        var params = uri.search(true);
        should(params.apikey).not.be.an.Array;
    });

    it("uses the request body in hashing", function() {
        var uri = utils.url();
        var sameUri = uri.clone();
        var body = "isBody=true";
        var key = "key";
        var secret = "secret";
        var signedWithoutBody = auth.addSignature(key, secret, uri);
        var signedWithBody = auth.addSignature(key, secret, sameUri, body);
        should.notEqual(signedWithBody.search(true).signature,
            signedWithoutBody.search(true).signature);
    });

    it("JSON-stringifies body if its an object", function() {
        var uri = utils.url();
        var key = "key";
        var secret = "secret";
        var body = { isBody: true };
        var bodyString = JSON.stringify(body);
        var sameUri = uri.clone();
        auth.addSignature(key, secret, uri, body);
        auth.addSignature(key, secret, sameUri, bodyString);
        should.equal(uri.search(true).signature,
            sameUri.search(true).signature);
    });

    it("thows an AuthenticationRequiredError if the key/secret is not a string", function() {
        var samples = [-1, 0, 1, { }, { i: "j" }, function() {}, null, undefined];
        var ex = "123";
        var uri = utils.url();
        var body = "body";
        samples.forEach(function(sample) {
            should.throws(function() {
                auth.addSignature(sample, ex, uri, body);
            }, errors.AuthenticationRequiredError);
            should.throws(function() {
                auth.addSignature(ex, sample, uri, body);
            }, errors.AuthenticationRequiredError);
        });
    });

    it("generates correct/expected hashes", function() {
        var key = "key";
        var secret = "secret";
        var uri = utils.url();
        var body = "body";
        var signature = "b7e7b6a8efb7951669dcc61f478df143fe4e3f2fbcec63a55e293cd7044e5234";
        auth.addSignature(key, secret, uri, body);
        var params = uri.search(true);
        should.equal(params.signature, signature);
    });
});


describe("auth.sign", function() {
    it("adds timestamp", function() {
        var uri = utils.url();
        auth.sign("key", "secret", uri);
        should(uri.hasQuery("timestamp")).be.ok;
    });
});
