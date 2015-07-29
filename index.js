/**
 * Node.js SDK for Ma3Route REST API
 */


"use strict";


// Exporting the modules for each  API object
exports = module.exports = {
    Client: require("./lib/client"),
    Poller: require("./lib/poller"),
    auth: require("./lib/auth"),
    bannerAdverts: require("./lib/bannerAdverts"),
    drivingReports: require("./lib/drivingReports"),
    externalStream: require("./lib/externalStream"),
    listedAdverts: require("./lib/listedAdverts"),
    misc: require("./lib/misc"),
    news: require("./lib/news"),
    places: require("./lib/places"),
    sse: require("./lib/sse"),
    trafficUpdates: require("./lib/trafficUpdates"),
    users: require("./lib/users"),
    utils: require("./lib/utils"),
    errors: require("common-errors"),
};


/**
 * A callback passed a collection of items such as traffic updates
 * @global
 * @callback collectionCallback
 * @param {Error} error - error object
 * @param {Array} items - an array of targetted items
 * @param {Object} meta - meta data concerning the data
 * @param {Object} response - the original response object
 */


/**
 * A callack passed a success indicator
 * @global
 * @callback successCallback
 * @param {Error} error
 * @param {Object} indicator
 * @param {Object} meta
 * @param {Object} response
 */


 /**
  * A callack passed a single items
  * @global
  * @callback itemCallback
  * @param {Error} error
  * @param {Object} item
  * @param {Object} meta
  * @param {Object} response
  */


/**
 * @global
 * @typedef {String} Endpoint
 */


/**
 * @global
 * @typedef {Function} itemsGetRequest
 * @param {Object} [params]
 * @param {collectionCallback} callback
 */


/**
 * @global
 * @typedef {Function} itemsGetOneRequest
 * @param {Number|Object} identifier
 * @param {Object} [params]
 * @param {itemCallback} callback
 */


/**
 * @global
 * @typedef {Function} itemsPostOneRequest
 * @param {Object} body
 * @param {successCallback} callback
 */


/**
 * @global
 * @typedef {Function} SSEClientFactory
 * @param {Object} initDict
 * @return {EventSource}
 */
