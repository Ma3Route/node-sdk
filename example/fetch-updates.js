var ready = require("./init")();
var sdk = ready.sdk;
var out = ready.out;

/**
 * We are fetching 200 traffic updates from Nairobi, which
 * has a town ID of 1. (In another example, you will see how
 * to get the towns registered in the system.)
 */
sdk.trafficUpdates.get(
    {
        limit: 200,
        townId: 1,
    },
    function(getError, updates) {
        if (getError) {
            out.error("error occurred fetching updates: %s", getError);
            console.error(getError);
            return;
        }
        out.log("found %d updates", updates.length);
        out.log("showing the 5 recently-added updates");
        return out.pjson(updates.slice(0, 5));
    }
);
