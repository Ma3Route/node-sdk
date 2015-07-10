/**
 * @module places
 * @description
 * Handling locations and related operations
 */


"use strict";



// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Retrieve registered towns
     * @type {itemsGetRequest}
     */
    getTowns: generate.newGet("towns"),
};
