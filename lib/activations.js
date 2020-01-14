/**
 * @module activations
 * @description
 * Handling activations
 */

"use strict";

// own modules
var paramsConfig = require("./params");
var generate = require("./generate");

// exported from this module
exports = module.exports = {
    /**
     * Activate an advert.
     * @type {itemsPostOneRequest}
     */
    activate: generate.newCustomPostOne(
        "activations",
        {
            active: true,
        },
        paramsConfig.activations.create
    ),
    /**
     * Deactivate an advert.
     * @type {itemsPostOneRequest}
     */
    deactivate: generate.newCustomPostOne(
        "activations",
        {
            active: false,
        },
        paramsConfig.activations.create
    ),
};
