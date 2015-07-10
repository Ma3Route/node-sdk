/**
 * @module auth
 * @description
 * Handling authentication needs of the API.
 */


"use strict";


// exported from module
exports = module.exports = {
    addSignature: addSignature,
    sign: sign,
};


// npm-installed modules
var _ = require("lodash");
var errors = require("common-errors");
var forge = require("node-forge");


// own modules
var utils = require("./utils");


/**
 * Add signature to URI instance for use in authenticating against the API.
 * The request body will be stringified using JSON.stringify if its not
 * a string.
 *
 * @private
 *
 * @param {String} key - used to identify the client
 * @param {String} secret - used to sign the request
 * @param {URIjs} uri - an instance of URIjs
 * @param {*} body - request body
 * @return {URIjs} the same instance of URIjs
 */
function addSignature(key, secret, uri, body) {
    if (!_.isString(key) || !_.isString(secret)) {
        throw new errors.AuthenticationRequiredError("key and secret must be provided for signing requests");
    }

    // remove signature if it exists in URI object
    uri.removeSearch("signature");

    // add api key
    uri.removeSearch("apikey");
    uri.addQuery("apikey", key);

    // create a valid url
    var url = uri.toString();
    var signatureBase = encodeURIComponent(url.substring(0, url.indexOf("?")));

    // append a "?" - preparing for parameter string
    signatureBase += "?";

    // create the parameter string
    var params = uri.search(true);
    var paramsKeys = utils.sortKeys(params);
    var parameterString = "";
    paramsKeys.forEach(function(paramKey) {
        if (parameterString !== "") {
            parameterString += "&";
        }
        parameterString += encodeURIComponent(paramKey) + "=" + encodeURIComponent(params[paramKey]);
    });

    // concatenating the parameter string
    signatureBase += parameterString;

    // concatenating the request body, if available
    if (body) {
        if (typeof body !== "string") {
            body = JSON.stringify(body);
        }
        signatureBase += encodeURIComponent(body);
    }

    // creating a hash
    var hmac = forge.hmac.create();
    hmac.start("sha256", secret);
    hmac.update(signatureBase);
    var hash = hmac.digest().toHex();

    // add hash to original uri object
    uri.addQuery("signature", hash);

    return uri;
}


/**
 * Sign a URI instance. This is simply a wrapper around {@link module:auth~addSignature}
 * that allows a timestamp to be added to the URI instance.
 *
 * @public
 *
 * @param {String} key - key used to sign
 * @param {String} secret - used to sign the request
 * @param {URIjs} uri - an instance of URIjs
 * @param {*} body - body to used in request
 * @return {URIjs} same instance of URIjs
 */
function sign(key, secret, uri, body) {
    // add timestamp
    uri.addQuery("timestamp", utils.createTimestamp());

    // add signature
    addSignature(key, secret, uri, body);

    return uri;
}
