var ready = require("./init")();
var sdk = ready.sdk;
var out = ready.out;

/**
 * We are fetching a single driving report, with ID '7751'.
 */
sdk.drivingReports.getOne(7751, function(getError, report) {
    if (getError) {
        out.error("error occurred fetching report: %s", getError);
        console.error(getError);
        return;
    }
    out.log("showing report with ID '%d'", report.id);
    out.pjson(report);
    return;
});
