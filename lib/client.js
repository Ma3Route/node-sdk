/**
 * @module client
 * @description
 * API Client
 */


"use strict";


// module variables
var modules = [
    "bannerAdverts",
    "drivingReports",
    "listedAdverts",
    "misc",
    "news",
    "places",
    "sse",
    "trafficUpdates",
    "users",
];


// built-in modules
var path = require("path");


// npm-installed modules
var _ = require("lodash");


/**
 * An API client.
 * All the module functions can be accessed using a client
 *
 * @example
 * // create a new client
 * var client = new sdk.Client({ key: "SoM3C0mP1exKey", secret: "pSu3d0rAnD0mS3CrEt" });
 *
 * // retrieive a single traffic update
 * client.trafficUpdates.getOne(1, function(err, items) {
 *   console.log(err, items);
 * });
 *
 * @constructor
 * @param {Object} [options]
 * @param {String} options.key - API key
 * @param {String} options.secret - API secret
 * @param {String} options.proxy - a valid URL to use as proxy
 */
function Client(options) {
    options = options || { };
    this._key = options.key || null;
    this._secret = options.secret || null;
    this._proxy = options.proxy || null;
    return this;
}


/*
 * Wrap a method allowing us to add things to add before/after sending off
 * requests
 */
function wrapMethod(func) {
    return function() {
        // context for each module function
        var self = { key: this._key };
        // add the key for signing
        self.key = this._key;
        // add proxy
        self.proxy = this._proxy;
        // call the function
        return func.apply(self, arguments);
    };
}


// adding the client methods
_.forEach(modules, function(moduleName) {
    // import the module
    var _module = require(path.join(__dirname, moduleName));

    // create an object/container for the module
    Client.prototype[moduleName] = { };

    // add methods to Client class
    _.forEach(_module, function(method, methodName) {
        if (typeof method === "function") {
            Client.prototype[moduleName][methodName] = wrapMethod(method);
        }
    });
});


// exported from module
exports = module.exports = Client;
exports.Client = Client;
