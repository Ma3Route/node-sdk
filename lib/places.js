/**
 * @module places
 */


"use strict";



// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    getTowns: generate.newGet("towns"),
};
