/**
 * @module bannerAdverts
 * @description
 * Handling banner adverts
 */


"use strict";


// own modules
var generate = require("./generate");


// exported from this module
exports = module.exports = {
    /**
     * Create a single banner advert
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("bannerAdverts"),
    /**
     * Retrieve banner adverts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("bannerAdverts"),
    /**
     * Retrieve a single banner advert
     *@type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("bannerAdverts"),
};
