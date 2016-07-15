/**
 * @module generate
 * @description
 * Generate endpoints and SSE clients
 */


 "use strict";


// exported from module
exports = module.exports = {
    newCustomPostOne: newCustomPostOne,
    newGet: newGet,
    newGetOne: newGetOne,
    newPostOne: newPostOne,
    newSSEClientFactory: newSSEClientFactory,
};


// npm-installed modules
var _ = require("lodash");
var debug = require("debug")("ma3route:node-sdk");
var EventSource = require("eventsource");


// own modules
var auth = require("./auth");
var utils = require("./utils");


/**
 * Return a function for retrieving one or more items
 *
 * @param  {Endpoint} endpoint
 * @param  {String[]} [allowable]
 * @return {itemsGetRequest}
 */
function newGet(endpoint, allowable) {
    return function(params, callback) {
        // allow options params
        var args = utils.allowOptionalParams(params, callback);
        // get and detach/remove the uri options
        var uriOptions = utils.getURIOptions([utils.setup(), this, args.params]);
        utils.removeURIOptions(args.params);
        // create the URI
        var uri = utils.url(endpoint, uriOptions);
        // get the auth options
        var authOptions = utils.getAuthOptions([utils.setup(), this, args.params]);
        utils.removeAuthOptions(args.params);
        // remove params that are not allowed
        args.params = utils.pickParams(args.params, allowable);
        // add the params as querystring to the URI
        utils.addQueries(uri, args.params);
        // sign the URI (automatically removes the secret param from the params)
        try {
            auth.sign(authOptions.key, authOptions.secret, uri);
        } catch(err) {
            return args.callback(err);
        }

        var url = uri.toString();
        debug("[GET] /%s (%s)", endpoint, url);
        return utils.request().get(url, utils.passResponse(args.callback));
    };
}


/**
 * Return a function for retrieving one item
 *
 * @param  {Endpoint} endpoint
 * @param  {String[]} [allowable]
 * @return {itemsGetOneRequest}
 */
function newGetOne(endpoint, allowable) {
    var get = newGet(endpoint, allowable);
    return function(id, params, callback) {
        var args = utils.allowOptionalParams(params, callback);
        if (typeof id === "object") {
            _.assign(args.params, id);
        } else {
            args.params.id = id;
        }

        return get.call(this, args.params, args.callback);
    };
}


/**
 * Return a function for posting items
 *
 * @param  {Endpoint} endpoint
 * @param  {String[]} [allowable]
 * @return {itemsPostOneRequest}
 */
function newPostOne(endpoint, allowable) {
    return function(body, callback) {
        // get and remove/detach URI options
        var uriOptions = utils.getURIOptions([utils.setup(), this, body]);
        utils.removeURIOptions(body);
        // create a URI
        var uri = utils.url(endpoint, uriOptions);
        // get auth options
        var authOptions = utils.getAuthOptions([utils.setup(), this, body]);
        utils.removeAuthOptions(body);
        // remove params that are not allowed
        body = utils.pickParams(body, allowable);
        // sign the URI (automatically removes the secret param from body)
        try {
            auth.sign(authOptions.key, authOptions.secret, uri, body);
        } catch(err) {
            return callback(err);
        }

        var url = uri.toString();
        debug("[POST] /%s (%s) [%j]", endpoint, url, body);
        return utils.request().post({
            url: url,
            body: body,
        }, utils.passResponse(callback));
    };
}


/**
 * Return a function for custom Post requests
 *
 * @param  {Endpoint} endpoint
 * @param  {Object} initParams - parameters used to indicate we are infact modifying
 * @param  {String[]} [allowable]
 * @return {itemsPostOneRequest}
 */
function newCustomPostOne(endpoint, initParams, allowable) {
    var modify = newPostOne(endpoint, allowable);
    return function(body, callback) {
        _.assign(body, initParams);
        return modify.call(this, body, callback);
    };
}


/**
 * Return a function that returns a SSE client
 *
 * @param  {Endpoint} endpoint
 * @return {SSEClientFactory}
 * @throws Error
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
        // determine whether to use an eventsource or poll the endpoint
        return new EventSource(uri.toString(), initDict);
    };
}
