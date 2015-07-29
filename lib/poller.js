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
 * Poller Class
 * @constructor
 * @param  {itemsGetRequest} getRequest
 * @param  {Object} [options]
 */
function Poller(getRequest, options) {
    var me = this;
    events.EventEmitter.call(me);
    var pollerOptions = utils.getPollerOptions([utils.setup(), me, options]);
    me._get = getRequest;
    me._interval = setInterval(function() {
        me._get(options, function(err, items, meta, res) {
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
