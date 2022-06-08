/**
 * Node.js SDK for Ma3Route REST API
 * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Home
 */

"use strict";

// Exporting the modules for each  API object
exports = module.exports = {
    Client: require("./lib/client"),
    Poller: require("./lib/poller"),
    auth: require("./lib/auth"),
    activations: require("./lib/activations"),
    bannerAdverts: require("./lib/bannerAdverts"),
    campaigns: require("./lib/campaigns"),
    drivingReports: require("./lib/drivingReports"),
    externalStream: require("./lib/externalStream"),
    images: require("./lib/images"),
    listedAdverts: require("./lib/listedAdverts"),
    misc: require("./lib/misc"),
    news: require("./lib/news"),
    places: require("./lib/places"),
    sse: require("./lib/sse"),
    trafficUpdates: require("./lib/trafficUpdates"),
    users: require("./lib/users"),
    utils: require("./lib/utils"),
    errors: require("common-errors"),
    generate: require("./lib/generate"),
};

/**
 * Settings for the SDK. Defaults can be found in the config.json file in root of repo.
 * This is to be passed to utils.setup().
 * @typedef  {Object} SETTINGS
 * @property {String}  baseurl - API base url
 * @property {Boolean} enforce_params_filter - whether to pick parameters before sending requests
 * @property {Object}  request - configures requests fired by SDK
 * @property {Boolean} request.strictSSL - whether to enable strict ssl
 * @property {Boolean} request.json - whether to return responses in JSON format
 * @see https://github.com/Ma3Route/node-sdk/blob/master/config.json
 */

/**
 * A callback passed a collection of items, such as traffic updates.
 * @callback collectionCallback
 * @param {Error} error - error object
 * @param {Array} items - array of items
 * @param {Object} meta - meta-data concerning the items
 * @param {Object} response - actual response object
 */

/**
 * A callback passed a success indicator
 * @callback successCallback
 * @param {Error} error - error object
 * @param {Object} indicator - status of the operation
 * @param {Boolean} indicator.success - whether the operation succeeded
 * @param {Boolean} indicator.message - message from the API
 * @param {Object} [indicator.object] - affected object
 * @param {Object} response - actual response object
 */

/**
 * A callback passed an error on failure, or nothing otherwise.
 * @callback emptySuccessCallback
 * @param {Error} error - error object
 */

/**
 * A callack passed a single item, such as a single traffic update.
 * @callback itemCallback
 * @param {Error} error -error object
 * @param {Object} item - the single item
 * @param {Object} meta - meta-data concerning the item
 * @param {Object} response - actual response object
 */

/**
 * String representing an endpoint. This is solely used internally by the SDK.
 * @typedef {String} Endpoint
 */

/**
 * Sends a DELETE request to delete a single item.
 * @typedef {Function} itemsDeleteOneRequest
 * @param {Number|Object} identifier - ID of the item
 * @param {Object} [params] - parameters
 * @param {emptySuccessCallback} callback
 */

/**
 * Sends a GET request to fetch an array of items.
 * @typedef {Function} itemsGetRequest
 * @param {Object} [params] - parameters
 * @param {collectionCallback} callback
 */

/**
 * Sends a GET request, to fetch a single item.
 * @typedef {Function} itemsGetOneRequest
 * @param {Number|Object} identifier - ID of the item
 * @param {Object} [params] - parameters
 * @param {itemCallback} callback
 */

/**
 * Sends a POST request, usually for creating and updating entities.
 * @typedef {Function} itemsPostOneRequest
 * @param {Object} body - parameters
 * @param {successCallback} callback
 */

/**
 * Sends a PUT request, usually for editing entities.
 * @typedef {Function} itemsPutOneRequest
 * @param {Object} body
 * @param {successCallback} callback
 */

/**
 * Creates and returns a SSE Client.
 * @typedef {Function} SSEClientFactory
 * @param {Object} initDict - initialization options
 * @return {EventSource}
 */
