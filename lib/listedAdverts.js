/**
 * @module listedAdverts
 * @see {@link https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Adverts}
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    createOne: generate.newCreateOne("listedAdverts"),
    get: generate.newGet("listedAdverts"),
    getOne: generate.newGetOne("listedAdverts"),
};
