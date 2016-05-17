# Ma3Route SDK: Examples

Before you start running these examples, replace `<your-API-key-goes-here>`
with your API key and `<your-API-secret-goes-here>` with your API secret,
in [`./sample.auth.js`][auth-file], then rename it to `auth.js`.
You should also consider using the `MA3ROUTE_API_KEY` and
`MA3ROUTE_API_SECRET` environment variables instead.

**Security Warning**: Once you are done running the examples you should
delete your API secret from `./auth.js`. **This is a precaution to avoid
accidentally publicizing your secret**.


## examples:

The following examples are included:

* [Fetching 200 traffic updates (fetch-updates.js)][fetch-updates]
* [Creating a single traffic update (single-update.js)][single-update]
* [Fetching 200 driving reports (fetch-reports.js)][fetch-reports]
* [Creating a single driving report (single-report.js)][single-report]
* [Watching for new traffic updates (watch-updates.js)][watch-updates]

You can run the examples by simply calling `node` on them, from
your terminal. For example, assuming you are in the `example/` directory:

```bash
$ node fetch-updates.js             # runs the example on 'fetching traffic updates'
```

Feel free to go through the source code in the examples' files. They
have quite good documentation, as comments.


## more:

### results display:

[JSON][json] is used to interact with the API. However, it is
**not** very easy on the human eye. Therefore, we are using
the package [cli-output][out] to provide a better display of
items retrieved from the API.

### I need help!

The issue tracker, related to this repository, is purposefully designated
for development issues and discussions, strictly related to the SDK.
**Informational** queries should be addressed to
[our issues repository][issues-repo]. We are waiting for you there.


[auth-file]:https://github.com/Ma3Route/node-sdk/examples/sample.auth.js
[fetch-updates]:https://github.com/Ma3Route/node-sdk/examples/fetch-updates.js
[single-update]:https://github.com/Ma3Route/node-sdk/examples/single-update.js
[fetch-reports]:https://github.com/Ma3Route/node-sdk/examples/fetch-reports.js
[single-report]:https://github.com/Ma3Route/node-sdk/examples/single-report.js
[watch-updates]:https://github.com/Ma3Route/node-sdk/examples/watch-update.js

[json]:http://json.org/
[out]:https://npmjs.com/package/cli-output
[issues-repo]:https://github.com/Ma3Route/issues
