/**
 * @module listedAdverts
 * @description
 * Handling listed adverts
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single listed advert
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("listedAdverts", paramsConfig.listedAdverts.create),
    /**
     * Retrieve listed adverts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("listedAdverts", paramsConfig.listedAdverts.get),
    /**
     * Retrieve a single listed advert
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("listedAdverts", paramsConfig.listedAdverts.get),
};