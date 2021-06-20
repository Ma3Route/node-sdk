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
    /** Upload a single image. */
    upload: generate.newPostOne("images/encoded", paramsConfig.images.create),
    /** Upload a single image for stream item. */
    uploadForStream: generate.newPostOne(
        "images/stream",
        paramsConfig.images.createForStream
    ),
};
