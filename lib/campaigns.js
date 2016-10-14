/**
 * @module campaigns
 * @description
 * Handling campaigns
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Create a single campaign
     * @type {itemsPostOneRequest}
     */
    createOne: generate.newPostOne("campaigns", paramsConfig.campaigns.create),
    /**
     * Retrieve campaigns
     * @type {itemsGetRequest}
     */
    get: generate.newGet("campaigns", paramsConfig.campaigns.get),
    /**
     * Retrieve a single campaign
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("campaigns", paramsConfig.campaigns.get),
    /**
     * Edit a single campaign
     * @type {itemsPutOneRequest}
     */
    editOne: generate.newPutOne("campaigns", paramsConfig.campaigns.edit),
};
