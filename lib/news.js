/**
 * @module news
 * @description
 * Viewing and editing news for Ma3Route
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single news post
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("news"),
    /**
     * Retrieve news posts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("news"),
    /**
     * Retrieve a single news post
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("news"),
};
