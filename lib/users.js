/**
 * @module users
 * @description
 * Handling user entities.
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Creating a new user
     * @type {itemsCreateOneRequest}
     */
    createOne: generate.newCreateOne("users"),
    /**
     * Editing user's profile
     * @type {itemsModifyOneRequest}
     */
    edit: generate.newModifyOne("users", {
        editprofile: true,
    }),
    /**
     * Retrieve user information
     * @type {itemsGetOneRequest}
     */
    getOne: generate.newGetOne("users"),
};
