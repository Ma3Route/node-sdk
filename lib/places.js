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
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Directions
     */
    createDirections: generate.newPostOne("directions", paramsConfig.directions.create),
    /**
     * Retrieve directions
     * @type {itemsGetOneRequest}
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Directions
     */
    getDirections: generate.newGetOne("directions", paramsConfig.directions.get),
    /**
     * Retrieve countries
     * @type {itemsGetRequest}
     */
    getCountries: generate.newGet("countries", paramsConfig.countries.get),
};
