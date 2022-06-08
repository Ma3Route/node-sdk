# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## Unreleased


## 2.3.0 - 2022-06-09

Added:

* Support path parameters/variables in endpoints.
* Support DELETE requests.
* Added methods:
  * `users.destroyOne()`: Delete a single user.


## 2.2.0 - 2022-05-29

Added:

* Added methods:
  * `drivingReports.getTags()`: Fetch tags for driving reports.
  * `trafficUpdates.getTags()`: Fetch tags for traffic updates.


## 2.1.0 - 2021-06-20

Added:

* Added methods:
  * `images.uploadForStream()`: Upload images for stream.
* Added support for Node.js v14, v16.

Removed:

* Removed support for Node.js v4, v6, v8, v10, v12.


## 2.0.0 - 2017-10-22

Added:

* Add support for API v3 methods
* Add methods:
  * `places.getAdvertLocations()`: Retrieve advert locations
  * `images.upload()`: Upload images
  * `utils.collectPages()`: Helper function for collecting data across multiple pages

Changed:

* (maintenance) Update dependencies

Removed:

* Remove support for Node.js v0.10, v0.11 and v0.12 series


## 1.0.0 - 2017-07-04

Added:

* Add support for Node.js v8.x

Changed:

* (maintenance) Update dependencies


## 0.13.0 - 2016-10-14

Added:

* Add 'campaigns' sub-module
* Add 'activations' sub-module
* Add support for Node.js v6.x

Changed:

* [maintenance] Update dependencies

Fixed:

* Fix rule ignoring examples in .npmignore


## 0.12.1 - 2016-10-05

Fixed:

* Fix syntax error in strict mode (issue [#12](https://github.com/Ma3Route/node-sdk/issues/12))


## 0.12.0 - 2016-09-21

Added:

* Add methods `sdk.bannerAdverts.editOne()` and `sdk.listedAdverts.editOne()`

Fixed:

* Typos in code


## 0.11.1 - 2016-07-15

Fixed:

* Fix passing the body to a success callback in POST requests


## 0.11.0 - 2016-06-07

Added:

* Add methods `Poller#pause()` and `Poller#resume()`
* Allow creating URIs with arbitrary endpoints
* Export the inner module, `generate`, for creating custom endpoint
  functions
* Support the `/countries` endpoint with: `sdk.places.getCountries()`


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


## 0.8.1 - 2015-09-28

Fixed:

* fix `shasum check failure` error in `npm install ma3route-sdk` (a6d19ffcd712c018c4dc2f02f0046d7b2369e246)


## 0.8.0 - 2015-09-26

Added:

* implement directions
* update urijs dependency
* explicitly depending on peer deps


## 0.7.0 - 2015-07-31

Added:

* extend the `Poller` class:
    * automatically tracks the last read id
    * accepts asynchronous params function
    * uses the "error" event for error messages
    * uses the "message" event only for items it receive


## 0.6.0 - 2015-07-30

Added:


* new class: `Poller` for polling endpoints. Useful is SSE is not working
* rebuild the landing page for project site
* using custom errors for different responses
* exporting errors module


## 0.5.0 - 2015-07-23

Added:

* allow deleting of reports and updates (463cb09)
* allow creating custom POST requests (705513c)
* update documentation on module functions (f1c94ef)

Fixed:

* fix severity levels endpoint (8ec7c61)
* decamelize param keys before picking (d893aa3)


## 0.4.0 - 2015-07-22

Added:

* allow configuring the http requests (ce57506)


Fixed:

* signing requests when using proxy (e227b89)


## 0.3.1 - 2015-07-22

Fixed:

* fix sending params in getOne requests


## 0.3.0 - 2015-07-21

Added:

* Parameters are picked. Only allowed parameters are passed in the requests.
* This parameter filtering can be disable by setting the configuration value for enforce_params_filter to false
* Documentation has also been updated


Fixed:

* keys were being added to the request accidentally
* GET requests would fail if parameters were not passed


## 0.2.0 - 2015-07-20

Added:

* support for external stream added



## 0.1.1 - 2015-07-19

Changed:

* contribution guidelines have been made
* npm package has been made more lean
* documentation has been updated to 0.1.1 about git branching model

Fixed:

* some bugs


## 0.0.0 - 2015-07-14

**Out in the Wild**
