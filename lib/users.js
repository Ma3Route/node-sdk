/**
 * @module users
 */


"use strict";


// own modules
var generate = require("./generate");


// module exports
exports = module.exports = {
    /**
     * Creating a new user
     */
    createOne: generate.newCreateOne("users"),
    /**
     * Editing user's profile
     */
    edit: generate.newModifyOne("users", {
        editprofile: true,
    }),
    /**
     * Retrieve user information.
     * `user` will be falsy if no error occurred but user is not known
     */
    getOne: generate.newGetOne("users"),
};
