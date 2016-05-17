exports = module.exports = {
    getAuth: getAuth,
};


// npm-installed modules
var out = require("cli-output");


// own modules
// try load the file, fail silently for now if it is missing.
var auth = {};
try {
    auth = require("./auth");
} catch(err) {}


/**
 * Return the authentication parameters, if available.
 * Otherwise, log to stderr and throw an error indicating missing
 * authentication parameters.
 *
 * @return {Object} auth
 */
function getAuth() {
    if (!auth.key || auth.key.indexOf("goes-here") !== -1) {
        var err = new Error("API key missing");
        out.error(err.message);
        throw err;
    }
    if (!auth.secret || auth.secret.indexOf("goes-here") !== -1) {
        var err = new Error("API secret missing");
        out.error(err.message);
        throw err;
    }
    return auth;
}
