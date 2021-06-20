/**
 * @module poller
 * @description
 * A Poller for Endpoints
 */

"use strict";

// built-in modules
var events = require("events");
var util = require("util");

// npm-installed modules
var _ = require("lodash");

// own modules
var utils = require("./utils");

/**
 * Poller Class. Inherits from events.EventEmitter. This poller
 * is designed in that it polls for new items automatically
 * without having you implement `lastreadId` logic.
 *
 * @example
 * // create a new poller that keeps retrieiving traffic updates
 * var poller = new sdk.Poller(sdk.trafficUpdates.get, {
 *   interval: 5000, // 5 seconds
 * });
 *
 * // listen for new updates
 * poller.on("message", function(updates, meta, responseObject) {
 *   console.log("received these updates: %j", updates);
 * });
 *
 * // listen for errors e.g. network failures etc.
 * // if an error occurs an you not listening on the "error"
 * // event, the error will bubble up to the domain/process.
 * poller.on("error", function(err) {
 *   console.log("error: %s", err);
 * });
 *
 * // you have to explicitly start it
 * poller.start();
 *
 * // lets say we close it after a minute or so
 * setTimeout(function() {
 *   poller.stop();
 * }, 1000 * 60);
 *
 * @constructor
 * @param  {itemsGetRequest} getRequest - request function fired in each poll
 * @param  {Object} [options]
 * @param  {Object|Function} [options.params] - parameters passed to get request.
 *      If `options.params` is a function, it is invoked and its return value is
 *      assumed an object as the request params.
 *      If `options.params` requires to do an asynchronous action, it is passed a
 *      `done` function as its only argument to call with the value when done.
 * @param  {Integer} [options.interval=5000] - configures the poller's timer
 */
function Poller(getRequest, options) {
    options = options || {};
    events.EventEmitter.call(this);
    this._pollerOptions = utils.getPollerOptions([
        utils.setup().poller,
        options,
    ]);
    this._get = getRequest;
    this._params = options.params || {};
    this._lastreadId = this._params.lastreadId || null;
    this._timer = null;
    this._requestPending = false;
    this._paused = false;
    return this;
}

// inherit from the EventEmitter class
util.inherits(Poller, events.EventEmitter);

/**
 * Starts the poller.
 */
Poller.prototype.start = function start() {
    var me = this;
    function sendRequest(args) {
        me._get(args, function(err, items, meta, res) {
            me._requestPending = false;

            if (err) {
                return me.emit("error", err);
            }
            // emit 'message' event if we received items
            if (items.length) {
                // since we do not know if we are in ascending or descending
                // order, please do check
                var id1 = items[0].id;
                var id2 = items[items.length - 1].id;
                me._params.lastreadId = id1 > id2 ? id1 : id2;
                return me.emit("message", items, meta, res);
            }
            return null;
        });
    }
    me._timer = setInterval(function() {
        // if we are paused, return immediately
        if (me._paused) {
            return null;
        }

        // only send request, if there is none pending
        if (me._requestPending) {
            return null;
        }

        me._requestPending = true;
        var args = {};
        if (me._lastreadId) {
            args.lastreadId = me._lastreadId;
        }
        if (_.isFunction(me._params)) {
            if (me._params.length) {
                return me._params(function(params) {
                    _.merge(args, params);
                    return sendRequest(args);
                });
            }
            _.merge(args, me._params());
        } else {
            _.merge(args, me._params);
        }
        return sendRequest(args);
    }, me._pollerOptions.interval);
};

/**
 * Pause the poller. Note that this does not actually stop the
 * interval used internally. It basically causes a 'noop' to be
 * fired instead of an actual network request. This implementation
 * is simple, and also cheap if you require to pause and resume
 * multiple times.
 */
Poller.prototype.pause = function pause() {
    this._paused = true;
    return this;
};

/**
 * Resume the poller, if it was paused.
 */
Poller.prototype.resume = function resume() {
    this._paused = false;
    return this;
};

/**
 * Stops the poller.
 */
Poller.prototype.stop = function stop() {
    this._timer.close();
    this.removeAllListeners();
    return this;
};

// exporting the constructor
exports = module.exports = Poller;
exports.Poller = Poller;
