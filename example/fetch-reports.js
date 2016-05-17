var ready = require("./init")();
var sdk = ready.sdk;
var out = ready.out;


/**
 * We are fetching 200 driving reports.
 */
sdk.drivingReports.get({
    limit: 200,
}, function(getError, reports) {
    if (getError) {
        out.error("error occurred fetching reports: %s", getError);
        console.error(getError);
        return;
    }
    out.log("found %d reports", reports.length);
    out.log("showing the 5-recently-added reports");
    return out.pjson(reports.slice(0, 5));
});
