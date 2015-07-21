/**
 * @module bannerAdverts
 * @description
 * Handling banner adverts
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// exported from this module
exports = module.exports = {
    /**
     * Create a single banner advert
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("bannerAdverts", paramsConfig.bannerAdverts.create),
    /**
     * Retrieve banner adverts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("bannerAdverts", paramsConfig.bannerAdverts.get),
    /**
     * Retrieve a single banner advert
     *@type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("bannerAdverts", paramsConfig.bannerAdverts.get),
};
