var ready = require("./init")();
var sdk = ready.sdk;
var out = ready.out;

/**
 * We are fetching a single traffic update, with ID '482955'.
 */
sdk.trafficUpdates.getOne(482955, function(getError, update) {
    if (getError) {
        out.error("error occurred fetching update: %s", getError);
        console.error(getError);
        return;
    }
    out.log("showing update with ID '%d'", update.id);
    out.pjson(update);
    return;
});
