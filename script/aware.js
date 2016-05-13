/**
 * Get aware
 */


"use strict";


// built-in modules
var fs = require("fs");
var path = require("path");


// npm-installed modules
var semver = require("semver");


// module variables
var DATA = {
    versions: [],
    latestVersion: null,
};


// determining the versions of docs available
var files = fs.readdirSync(path.resolve(__dirname, ".."));
var versions = [ ];
files.forEach(function(version) {
    if (/\d+\.\d+\.\d+/.test(version)) {
        versions.push(version);
    }
});
DATA.versions = versions;


// sort them out
var latestVersion = DATA.versions[0];
DATA.versions = DATA.versions.sort(semver.compare);
DATA.latestVersion = DATA.versions[DATA.versions.length - 1];


// export if required
exports = module.exports = DATA;

// echo the json
console.log(DATA);
