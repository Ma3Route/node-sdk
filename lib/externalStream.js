/**
 * @module externalStream
 * @description
 * Handling the external stream
 * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/External%20Stream
 */

"use strict";

// own modules
var paramsConfig = require("./params");
var generate = require("./generate");

// module exports
exports = module.exports = {
    /**
     * Retrieve items from external stream
     * @type {itemsGetRequest}
     */
    get: generate.newGet("externalStream", paramsConfig.externalStream.get),
    /**
     * Retrieve a single item from external stream
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne(
        "externalStream",
        paramsConfig.externalStream.get
    ),
};
