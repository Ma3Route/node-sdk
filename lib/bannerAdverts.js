/**
 * @module bannerAdverts
 * @see {@link https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Banner%20Adverts}
 */


"use strict";


// own modules
var generate = require("./generate");


// exported from this module
exports = module.exports = {
    createOne: generate.newCreateOne("bannerAdverts"),
    get: generate.newGet("bannerAdverts"),
    getOne: generate.newGetOne("bannerAdverts"),
};
