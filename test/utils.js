/**
 * Test utilities
 */


"use strict";


// built-in modules
var path = require("path");


// module variables
var defaults = {
    timeout: 1000 * 60 * 5, // 5 minutes
};
var paths = {
    image: path.join(__dirname, "data/image.png"),
};
var data = {
    image: {
        path: paths.image,
        ext: path.extname(paths.image).slice(1),
    },
};


exports = module.exports = {
    data: data,
    defaults: defaults,
};
