/**
 * @module places
 * @description
 * Handling locations and related operations
 */


"use strict";


// own modules
var generate = require("./generate");
var paramsConfig = require("./params");


// module exports
exports = module.exports = {
    /**
     * Retrieve registered towns
     * @type {itemsGetRequest}
     */
    getTowns: generate.newGet("towns", []),
    /**
     * Retrieve notable places
     * @type {itemsGetRequest}
     */
    getPlaces: generate.newGet("places", paramsConfig.places.get),
    /**
     * Create directions
     * @type {itemsPostOneRequest}
     */
    createDirections: generate.newPostOne("directions", paramsConfig.directions.create),
    /**
     * Retrieve directions
     * @type {itemsGetOneRequest}
     */
    getDirections: generate.newGetOne("directions", paramsConfig.directions.get),
};
