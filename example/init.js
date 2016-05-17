exports = module.exports = init;


// npm-installed modules
var out = require("cli-output");


// own modules
var sdk = require("..");
var utils = require("./utils");


/**
 * Initialize. This has placed in this separate file so as to
 * avoid duplicate code all over.
 *
 * It simply does the following:
 * 1. `require()` the modules we will be using frequently
 * 2. get API key and secret
 * 3. setup the SDK so we can use it immediately
 * 4. return an object containing modules from (1) and the SDK module
 */
function init() {
    /**
    * Get API key and secret.
    */
    var auth = utils.getAuth();

    /**
     * Set up the SDK.
     */
    sdk.utils.setup({
        key: auth.key,
        secret: auth.secret,
    });

    return {
        out: out,
        sdk: sdk,
    };
}
