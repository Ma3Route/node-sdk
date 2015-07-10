/**
 * @module news
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    get: generate.newGet("news"),
    getOne: generate.newGetOne("news"),
    createOne: generate.newCreateOne("news"),
};
