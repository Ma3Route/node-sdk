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
     * @type {itemsPostOneRequest}
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Registration
     */
    createOne: generate.newPostOne("users", paramsConfig.users.create),
    /**
     * Editing user's profile
     * @type {itemsPostOneRequest}
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Edit%20Profile
     */
    edit: generate.newCustomPostOne(
        "users",
        {
            editprofile: true,
        },
        paramsConfig.users.edit
    ),
    /**
     * Retrieve user information
     * @type {itemsGetOneRequest}
     * @see https://bitbucket.org/ma3route_team/ma3route-api-documentation/wiki/Login
     */
    getOne: generate.newGetOne("users", paramsConfig.users.login),
    /**
     * Reset user's password
     * @type {itemsPostOneRequest}
     */
    resetPassword: generate.newCustomPostOne(
        "users",
        {
            resetpassword: true,
        },
        paramsConfig.users.resetPassword
    ),
};
