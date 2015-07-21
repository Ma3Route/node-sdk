/**
 * @module users
 * @description
 * Handling user entities.
 */


"use strict";


// own modules
var paramsConfig = require("./params");
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Creating a new user
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("users", paramsConfig.users.create),
    /**
     * Editing user's profile
     * @type {itemsModifyOneRequest}
     */
    edit: generate.newModifyOne("users", {
        editprofile: true,
    }, paramsConfig.users.edit),
    /**
     * Retrieve user information
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("users", paramsConfig.users.login),
};
