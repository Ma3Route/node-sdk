/**
 * @module poller
 * @description
 * A Poller for Endpoints
 */


"use strict";


// built-in modules
var events = require("events");
var util = require("util");


// own modules
var utils = require("./utils");


/**
 * Poller Class. Inherits from events.EventEmitter.
 *
 * @name Poller
 * @global
 * @constructor
 *
 * @example
 * // create a new poller
 * var client = new sdk.Poller(sdk.trafficUpdates.get, params);
 *
 * // keeps retrieiving traffic updates
 * client.trafficUpdates.getOne(1, function(err, items) {
 *   console.log(err, items);
 * });
 *
 * @param  {itemsGetRequest} getRequest
 * @param  {Object} [params]
 * @param  {Integer} [params.interval=5000] - configures the poller's timer
 */
function Poller(getRequest, params) {
    var me = this;
    events.EventEmitter.call(me);
    var pollerOptions = utils.getPollerOptions([utils.setup(), me, params]);
    me._get = getRequest;
    me._interval = setInterval(function() {
        me._get(params, function(err, items, meta, res) {
            me.emit("message", err, items, meta, res);
        });
    }, pollerOptions.interval);
    return me;
}



// inherit from the EventEmitter class
util.inherits(Poller, events.EventEmitter);


/**
 * Stops the poller
 */
Poller.prototype.stop = function stop() {
    this._interval.close();
    this.removeAllListeners();
    return this;
};



// exporting the constructor
exports = module.exports = Poller;
exports.Poller = Poller;
