/**
 * Tests against the images module
 */


"use strict";


// built-in modules
var fs = require("fs");


// npm-installed modules
var should = require("should");


// own modules
var images = require("../lib/images");
var utils = require("./utils");


describe("images", function() {
    this.timeout(utils.defaults.timeout);

    describe("#upload", function() {
        it("works", function(done) {
            images.upload({
                base64string: fs.readFileSync(utils.data.image.path).toString("base64"),
                extension: utils.data.image.ext,
            }, function(error, body) {
                should(error).not.be.ok();
                // TODO: remove the 'console.log' call below.
                // TODO: assert the body parameters
                console.log(body);
                return done();
            });
        });
    });
});
