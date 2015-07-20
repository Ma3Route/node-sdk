/**
 * @module externalStream
 * @description
 * Handling the external stream
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Retrieve items from external stream
     * @type {itemsGetRequest}
     */
    get: generate.newGet("externalStream"),
    /**
     * Retrieve a single item from external stream
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("externalStream"),
};
