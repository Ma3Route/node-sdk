/**
 * @module images
 * @description
 * Handling images.
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// exported from this module
exports = module.exports = {
    /**
     * Upload a single image.
     */
    upload: generate.newPostOne("images", paramsConfig.images.create),
};
