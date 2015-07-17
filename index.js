/**
 * Node.js SDK for Ma3Route REST API
 */


"use strict";


// Exporting the modules for each  API object
exports = module.exports = {
    Client: require("./lib/client"),
    auth: require("./lib/auth"),
    bannerAdverts: require("./lib/bannerAdverts"),
    drivingReports: require("./lib/drivingReports"),
    listedAdverts: require("./lib/listedAdverts"),
    misc: require("./lib/misc"),
    news: require("./lib/news"),
    places: require("./lib/places"),
    sse: require("./lib/sse"),
    trafficUpdates: require("./lib/trafficUpdates"),
    users: require("./lib/users"),
    utils: require("./lib/utils"),
};


/**
 * A callback passed a collection of items such as traffic updates or simply a success/error message
 * @global
 * @callback responseCallback
 * @param {Error} error - error object
 * @param {Array} items - an array of targetted items
 * @param {Object} meta - meta data concerning the data
 * @param {Object} response - the original response object
 */


/**
 * @global
 * @typedef {String} Endpoint
 */


/**
 * @global
 * @typedef {Function} itemsGetRequest
 * @param {Object} [params]
 * @param {responseCallback} callback
 */


/**
 * @global
 * @typedef {Function} itemsGetOneRequest
 * @param {Number|Object} identifier
 * @param {Object} [params]
 * @param {responseCallback} callback
 */


/**
 * @global
 * @typedef {Function} itemsCreateOneRequest
 * @param {Object} body
 * @param {responseCallback} callback
 */


/**
 * @global
 * @typedef {Function} itemsModifyOneRequest
 * @param {Object} body
 * @param {responseCallback} callback
 */


/**
 * @global
 * @typedef {Function} SSEClientFactory
 * @param {Object} initDict
 * @return {EventSource}
 */
