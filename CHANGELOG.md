
# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## Unreleased

Added:

* Added `sdk.places.getPlaces()` for retrieving notable places


## 0.9.0 - 11/03/2016

Added:

* added `sdk.user.resetPassword()` for resetting password


## 0.8.4 - 27/02/2016

Changed:

* Poller emits `"message"` event only when one or more items are returned from API
* Poller only fires request, if there's **none** pending

Fixed:

* Poller should use the correct last read ID, irrespective of the order of returned items


## 0.8.3 - 17/02/2016

Fixed:

* revert unwarranted typo change


## 0.8.2 - 17/02/2016

Added:

* added CHANGELOG.md

Changed:

* updated dependencies to latest versions: eventsource, lodash, grunt-jsdoc,
  istanbul, mocha-lcov-reporter, should

Fixed:

* fixed typo in endpoint URL, `/contactus`

