/**
 * @module generate
 * @description
 * Generate endpoints and SSE clients
 */


 "use strict";


// exported from module
exports = module.exports = {
    newCreateOne: newCreateOne,
    newGet: newGet,
    newGetOne: newGetOne,
    newModifyOne: newModifyOne,
    newSSEClientFactory: newSSEClientFactory,
};


// npm-installed modules
var _ = require("lodash");
var debug = require("debug")("ma3route:nodejs-sdk");
var EventSource = require("eventsource");


// own modules
var auth = require("./auth");
var utils = require("./utils");


/**
 * Return a function for retrieving one or more items
 *
 * @param {Endpoint} endpoint
 * @return {itemsGetRequest}
 */
function newGet(endpoint) {
    return function(params, callback) {
        // allow options params
        var args = utils.allowOptionalParams(params, callback);
        // get and detach/remove the uri options
        var uriOptions = utils.getURIOptions(args.params);
        utils.removeURIOptions(args.params);
        // create the URI
        var uri = utils.url(endpoint, uriOptions);
        // get the auth options
        var authOptions = utils.getAuthOptions([utils.setup(), this, args.params]);
        // add the params as querystring to the URI
        utils.addQueries(uri, args.params);
        // sign the URI (automatically removes the secret param from the params)
        auth.sign(authOptions.key, authOptions.secret, uri);

        var url = uri.toString();
        debug("[GET] /%s", endpoint);
        return utils.request.get(url, utils.passResponse(args.callback));
    };
}


/**
 * Return a function for retrieving one item
 *
 * @param {Endpoint} endpoint
 * @return {itemsGetOneRequest}
 */
function newGetOne(endpoint) {
    var get = newGet(endpoint);
    return function(id, params, callback) {
        var args = utils.allowOptionalParams(params, callback);
        args.params.id = id;

        return get(args.params, args.callback);
    };
}


/**
 * Return a function for creating one item
 *
 * @param {Endpoint} endpoint
 * @return {itemsCreateOneRequest}
 */
function newCreateOne(endpoint) {
    return function(body, callback) {
        // get and remove/detach URI options
        var uriOptions = utils.getURIOptions(body);
        utils.removeURIOptions(body);
        // create a URI
        var uri = utils.url(endpoint, uriOptions);
        // get auth options
        var authOptions = utils.getAuthOptions([utils.setup(), this, body]);
        // sign the URI (automatically removes the secret param from body)
        auth.sign(authOptions.key, authOptions.secret, uri, body);

        var url = uri.toString();
        debug("[POST] /%s", endpoint);
        return utils.request.post({
            url: url,
            body: body,
        }, utils.passResponse(callback));
    };
}


/**
 * Return a function for modifying item
 *
 * @param {Endpoint} endpoint
 * @param {Object} initParams - parameters used to indicate we are infact modifying
 * @return {itemsModifyOneRequest}
 */
function newModifyOne(endpoint, initParams) {
    var modify = newCreateOne(endpoint);
    return function(body, callback) {
        _.assign(body, initParams);
        return modify(body, callback);
    };
}


/**
 * Return a function that returns a SSE client
 *
 * @param {Endpoint} endpoint
 * @return {SSEClientFactory}
 */
function newSSEClientFactory(endpoint) {
    return function(initDict) {
        initDict = initDict || { };
        // get URI options
        var uriOptions = utils.getURIOptions(initDict);
        utils.removeURIOptions(initDict);
        // create a new URI
        var uri = utils.url(endpoint, uriOptions);
        // get auth options
        var authOptions = utils.getAuthOptions([utils.setup(), this, initDict]);
        // sign the URI (automatically removes the secret param from initDict)
        auth.sign(authOptions.key, authOptions.secret, uri);
        return new EventSource(uri.toString(), initDict);
    };
}
