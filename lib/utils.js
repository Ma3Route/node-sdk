/**
 * @module utils
 * @description
 * SDK Utilities, used internally.
 */

"use strict";

// module exports
exports = module.exports = {
    addQueries: addQueries,
    allowOptionalParams: allowOptionalParams,
    collectPages: collectPages,
    getOptions: getOptions,
    getAuthOptions: getAuthOptions,
    getURIOptions: getURIOptions,
    createTimestamp: createTimestamp,
    getPollerOptions: getPollerOptions,
    getProxy: getProxy,
    parseResponse: parseResponse,
    passResponse: passResponse,
    pickParams: pickParams,
    request: request,
    removeAuthOptions: removeAuthOptions,
    removeOptions: removeOptions,
    removeURIOptions: removeURIOptions,
    setProxy: setProxy,
    setup: setup,
    shuffleArray: shuffleArray,
    sortKeys: sortKeys,
    url: url,
};

// npm-installed modules
var _ = require("lodash");
var decamelize = require("decamelize");
var errors = require("common-errors");
var rawRequest = require("request");
var URI = require("urijs");

// own modules
var config = require("../config");

// module variables
var SETTINGS = _.cloneDeep(config);
var uriKeys = ["proxy", "apiVersion"];
var authKeys = ["key", "secret"];
var pollerKeys = ["interval"];

/**
 * Return a custom request object
 *
 * @public
 *
 * @return {Object} request object
 */
function request() {
    return rawRequest.defaults(SETTINGS.request);
}

/**
 * Set the SDK settings
 *
 * @public
 *
 * @param {SETTINGS} settings - new SDK settings
 * @return {Object} the newly-set SDK settings
 */
function setup(settings) {
    if (!settings) {
        return _.cloneDeep(SETTINGS);
    }
    _.merge(SETTINGS, settings);
    return _.cloneDeep(SETTINGS);
}

/**
 * Setting up proxy for the whole SDK
 *
 * @public
 *
 * @param {String} proxy - a valid url
 */
function setProxy(proxy) {
    SETTINGS.proxy = proxy;
    return SETTINGS.proxy;
}

/**
 * Return the currently set proxy
 *
 * @public
 *
 * @return {String} the set proxy url
 */
function getProxy() {
    return SETTINGS.proxy;
}

/**
 * Return an URI object (from URI.js) for easier URL building.
 *
 * @public
 * @see http://medialize.github.io/URI.js/docs.html for docs on URI.js
 *
 * @param {String} [label] label - identifying the URL.
 * @param {Object} [options] options - options to be used
 * @return {URI} an instance of URI.js
 */
function url(label, options) {
    switch (label) {
        case "activations":
            return url(options).segment("activations");
        case "advertLocations":
            return url(options).segment("adlocations");
        case "bannerAdverts":
            return url(options).segment("bannerads");
        case "campaigns":
            return url(options).segment("campaigns");
        case "contactUs":
            return url(options).segment("contactus");
        case "countries":
            return url(options).segment("countries");
        case "directions":
            return url(options).segment("directions");
        case "drivingReports":
            return url(options).segment("drivingreports");
        case "driveTypes":
            return url(options).segment("drivetypes");
        case "externalStream":
            return url(options).segment("externalstream");
        case "listedAdverts":
            return url(options).segment("ads");
        case "news":
            return url(options).segment("news");
        case "places":
            return url(options).segment("places");
        case "severity":
            return url(options).segment("severities");
        case "sseDrivingReports":
            return url(options).segment("ssedrivingreports");
        case "sseTrafficUpdates":
            return url(options).segment("ssetrafficupdates");
        case "towns":
            return url(options).segment("towns");
        case "trafficUpdates":
            return url(options).segment("trafficupdates");
        case "users":
            return url(options).segment("users");
        default:
            options = options || {};
            if (label && typeof label === "object") {
                options = label;
                label = null;
            }
            // Proxy URLs always override the default ones
            var topLevel =
                options.proxy ||
                SETTINGS.proxy ||
                (options.apiVersion === 3
                    ? SETTINGS.baseurlv3
                    : SETTINGS.baseurl);
            var uri = URI(topLevel);
            if (label) return uri.segment(label);
            return uri;
    }
}

/**
 * Shuffles items in an array
 * Operation takes O(n) time. The array passed is operated on as its
 * reference, rather than value, is passed to the function.
 *
 * @public
 *
 * @param {Array} array - an array of items
 * @return {Array} array with the the items shuffled
 */
function shuffleArray(array) {
    var length = array.length;
    var randomIndex;
    var currentIndex = 0;
    var tmp;
    for (; currentIndex < length; currentIndex++) {
        randomIndex = Math.floor(Math.random() * length);
        tmp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tmp;
    }
    return array;
}

/**
 * Generate a UNIX timestamp
 *
 * @public
 *
 * @return {Number} UNIX timestamp
 */
function createTimestamp() {
    return Date.now();
}

/**
 * Return a sorted array of an object's keys
 *
 * @public
 *
 * @param {Object} object - an object
 * @return {Array} array of sorted keys
 */
function sortKeys(object) {
    var keys = _.keys(object);
    return keys.sort();
}

/**
 * Add properties to response
 *
 * @private
 * @see {@link http://visionmedia.github.io/superagent/#response-properties}
 *
 * @param {Object} response - as from the `request` module
 * @return {Object} the originally passed but modified reponse
 */
function parseResponse(response) {
    var code = response.statusCode;
    var type = (code / 100) | 0;
    response.type = type;

    // basics
    switch (type) {
        case 1:
            response.info = type;
            break;
        case 2:
            response.ok = type;
            break;
        case 3:
            // ???
            break;
        case 4:
            response.clientError = type;
            response.error = type;
            response.ErrorClass = errors.HttpStatusError;
            break;
        case 5:
            response.serverError = type;
            response.error = type;
            response.ErrorClass = errors.HttpStatusError;
            break;
    }

    // error classes and sugar
    switch (code) {
        case 201:
            response.created = code;
            break;
        case 202:
            response.accepted = code;
            break;
        case 204:
            response.noContent = code;
            break;
        case 400:
            response.badRequest = code;
            break;
        case 401:
            response.unauthorized = code;
            response.ErrorClass = errors.AuthenticationRequiredError;
            break;
        case 403:
            response.forbidden = code;
            response.ErrorClass = errors.NotPermittedError;
            break;
        case 404:
            response.notFound = code;
            response.ErrorClass = errors.NotFoundError;
            break;
        case 406:
            response.notAcceptable = code;
            break;
        case 500:
            response.internalServerError = code;
            break;
    }

    // using body (and not status code)
    if (response.body && response.body.success === false) {
        if (!response.error) {
            response.error = 4; // assume is client error
            response.ErrorClass = errors.HttpStatusError;
        }
    }

    // null bodies
    if (_.includes([null, undefined, ""], response.body)) {
        if (!response.error) {
            response.error = 5; // assume the server fucked up
            response.ErrorClass = errors.HttpStatusError;
        }
    }

    return response;
}

/**
 * Parse response then pass to callback
 *
 * @public
 *
 * @param {Function} callback - user's callback
 * @param {Object} [options]
 * @param {Boolean} [options.post] - callback is for a POST request
 * @param {Boolean} [options.put] - callback is for a PUT request
 * @return {Function} function to handle responses from `request` calls
 */
function passResponse(callback, options) {
    options = options || {};
    return function handleResponse(error, response, body) {
        if (error) {
            return callback(new errors.io.IOError(error.mesage, error));
        }
        response = parseResponse(response);
        body = body || {};
        if (response.error) {
            var message = response.body
                ? response.body.message
                : "received an empty body";
            var err = new response.ErrorClass(response.statusCode, message);
            if (options.post || options.put)
                return callback(err, body, response);
            return callback(err, body.data, body.meta, response);
        }
        if (options.post || options.put) return callback(null, body, response);
        return callback(null, body.data, body.meta, response);
    };
}

/**
 * Append querystring using key-value pairs from an object.
 * If a key exists both in the uri object and params, the one
 * in the uri object will be replaced. Any camelcased key is
 * automatically converted to lowercase with underscore separators.
 * Some keys can be excluded automatically. They include: secret.
 *
 * @public
 *
 * @param {URI} uri - an instance of URIjs
 * @param {Object} params - object with parameters
 * @param {Boolean} [toExclude=true] - whether to exclude keys automatically
 * @return {URIjs} the uri with the queries appended
 */
function addQueries(uri, params, toExclude) {
    toExclude = _.isBoolean(toExclude) ? toExclude : true;
    var excludes = ["key", "secret", "proxy"];
    for (var key in params) {
        // ignore excludes
        if (toExclude && _.includes(excludes, key)) {
            continue;
        }
        if (params.hasOwnProperty(key)) {
            // remove key if it exists
            uri.removeQuery(key);
            uri.addQuery(key, params[key]);
        }
    }
    return uri;
}

/**
 * Allow 'params' to be optional, thus user can pass 'callback' in its place.
 *
 * @public
 *
 * @param {*} params - user's params
 * @param {Function} [callback] - user's callback
 * @return {Object} args
 * @return {Function} args.callback
 * @return {Function} args.params
 */
function allowOptionalParams(params, callback) {
    if (!callback) {
        callback = params;
        params = {};
    }
    return {
        params: params,
        callback: callback,
    };
}

/**
 * Return an object with key-value pairs, using keys, from an object
 *
 * @param {Object|Object[]} sources - object(s) to look for the properties
 * @param {Array} keys - an array of keys of the properties to look up
 * @param {Object} [dest] - destination object
 * @return {Object} options
 */
function getOptions(sources, keys, dest) {
    var options = dest || {};

    // allow source be an array
    if (!_.isArray(sources)) {
        sources = [sources];
    }

    // using the keys for lookup
    keys.forEach(function(key) {
        // from each source
        sources.forEach(function(source) {
            if (source && source[key]) {
                options[key] = source[key];
            }
        });
    });

    return options;
}

/**
 * Return an object with options required to instantiate URI.
 *
 * @param {Object|Object[]} sources - objects to look for the properties
 * @param {Object} [dest] - destination object
 * @return {Object} options
 */
function getURIOptions(sources, dest) {
    return getOptions(sources, uriKeys, dest);
}

/**
 * Delete keys from objects
 *
 * @param {Object[]} args
 * @param {String|String[]} keys
 */
function removeOptions(args, keys) {
    if (!_.isArray(keys)) {
        keys = [keys];
    }
    for (var index = 0; index < args.length; index++) {
        var arg = args[index];
        for (var key in arg) {
            if (_.includes(keys, key)) {
                delete arg[key];
            }
        }
    }
}

/**
 * Remove all options applicable for creating a new URI instance
 *
 * @param {...Object} objects - objects to modify
 */
function removeURIOptions() {
    return removeOptions(arguments, uriKeys);
}

/**
 * Remove all options applicable for signing requests
 *
 * @param {...Object} objects - objects to modify
 */
function removeAuthOptions() {
    return removeOptions(arguments, authKeys);
}

/**
 * Return an object with authentication options from an object
 *
 * @param {Object|Object[]} sources - objects to look for the properties
 * @param {Object} [dest] - destination object
 * @return {Object} options
 */
function getAuthOptions(sources, dest) {
    return getOptions(sources, authKeys, dest);
}

/**
 * Return an object with poller options from sources
 *
 * @param  {Object|Object[]} sources
 * @param  {Object} [dest]
 * @return {Object} options
 */
function getPollerOptions(sources, dest) {
    return getOptions(sources, pollerKeys, dest);
}

/**
 * Pick out parameters
 *
 * @param  {Object} params
 * @return {Object} cleaner params
 */
function pickParams(params, keys) {
    params = _.cloneDeep(params);
    // decamelize all options
    for (var key in params) {
        var value = params[key];
        delete params[key];
        // TODO: handle this inconsistency consistently in the library :(
        // 'base64String': introduced by 'image.upload()'
        if (["base64String"].indexOf(key) === -1) {
            key = decamelize(key, "_");
        }
        params[key] = value;
    }
    if (SETTINGS.enforce_params_filter) {
        return _.pick(params, keys);
    }
    return params;
}

/**
 * Helper function for collecting all pages of items.
 *
 * @param  {Function} func(lastReadId, next) Function invoked to fetch requests
 * @param  {Object} callback(error, items) Function invoked once all pages have been fetched
 */
function collectPages(func, callback) {
    var items = [];
    var lastReadId = 0;
    function __collect() {
        return func(lastReadId, function(error, page) {
            if (error) {
                return callback(error);
            }
            if (!page.length) {
                return callback(null, items);
            }
            items = items.concat(page);
            lastReadId = page[page.length - 1].id;
            return __collect();
        });
    }
    return __collect();
}
