/**
 * @module listedAdverts
 * @description
 * Handling listed adverts
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single listed advert
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("listedAdverts"),
    /**
     * Retrieve listed adverts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("listedAdverts"),
    /**
     * Retrieve a single listed advert
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("listedAdverts"),
};
