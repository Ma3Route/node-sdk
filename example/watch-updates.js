var ready = require("./init")();
var sdk = ready.sdk;
var out = ready.out;

/**
 * A 'poller' is an object that uses polling, that is, it checks (and
 * retrieves) new items in the system at a regular interval, say, 30 seconds.
 * Using a poller, we can watch for new updates as they are
 * received into the system. You just provide it with one of the 'GET'
 * functions, availed by the SDK and the interval at which you want to
 * check for the items.
 *
 * NOTE: Do not poll agressively, otherwise you will hit your rate-limit.
 *       Also, it is just RUDE to do so, to both the system and other users.
 *       Therefore, try to make your interval as long as your use-case allows.
 */

/**
 * We are creating a poller, for traffic updates.
 */
var poller = new sdk.Poller(sdk.trafficUpdates.get, {
    interval: 5000, // 5 secs = 5 x 1000 ms
});

/**
 * You listen for 'messages', which signify that a new item has been
 * retrieved.
 */
poller.on("message", function(updates) {
    out.log("%d new items received", updates.length);
});

/**
 * You listen for 'errors', which signify errors such as network
 * failures, etc.
 *
 * NOTE: ensure you listen on this event, otherwise it will bubble up,
 *       likely leading to your process crashing. You really do no want
 *       that.
 */
poller.on("error", function(error) {
    out.error("caught an error: %s", error);
});

/**
 * You MUST start the polling, by 'hand'!
 */
poller.start();

/**
 * Listening for 'SIGINT' (C-z) so we can exit gracefully.
 */
process.on("SIGINT", function() {
    out.log("\nC-c caught. Exiting.");
    process.exit();
});

out.log("Polling already started");
out.log("You can hit Ctrl-C or Cmd-C to exit");
