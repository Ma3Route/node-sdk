/**
 * @module misc
 * @description
 * Handling miscellanous operations
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Contact the Ma3Route Team
     * @type {itemsPostOneRequest}
     */
    contactUs: generate.newPostOne("contactus", paramsConfig.contactUs.create),
};
