# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## Unreleased


## 0.10.2 - 2016-05-17

Changed:

* configuration variable `request.strictSSL` defaults to `false`, for now.
  This is a temporary work-around for the SSL peer verification error
  while performing requests against the API.


## 0.10.1 - 2016-05-11

Fixed:

* Fix typo in method name i.e. from `sdk.drivingReports.delete` to
  `sdk.drivingReports.deleteOne`


## 0.10.0 - 2016-03-23

Added:

* Added `sdk.places.getPlaces()` for retrieving notable places


## 0.9.0 - 2016-03-11

Added:

* added `sdk.user.resetPassword()` for resetting password


## 0.8.4 - 2016-02-27

Changed:

* Poller emits `"message"` event only when one or more items are returned from API
* Poller only fires request, if there's **none** pending

Fixed:

* Poller should use the correct last read ID, irrespective of the order of returned items


## 0.8.3 - 2016-02-17

Fixed:

* revert unwarranted typo change


## 0.8.2 - 2016-02-17

Added:

* added CHANGELOG.md

Changed:

* updated dependencies to latest versions: eventsource, lodash, grunt-jsdoc,
  istanbul, mocha-lcov-reporter, should

Fixed:

* fixed typo in endpoint URL, `/contactus`
