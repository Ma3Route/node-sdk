/**
 * @module news
 * @description
 * Viewing and editing news for Ma3Route
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single news post
     * @type {itemsPostOneRequest}
     */
    createOne: generate.newPostOne("news", paramsConfig.news.create),
    /**
     * Retrieve news posts
     * @type {itemsGetRequest}
     */
    get: generate.newGet("news", paramsConfig.news.get),
    /**
     * Retrieve a single news post
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("news", paramsConfig.news.get),
};
