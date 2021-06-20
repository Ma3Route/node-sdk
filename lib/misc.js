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
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Contact%20Us
     */
    contactUs: generate.newPostOne("contactUs", paramsConfig.contactUs.create),
};
