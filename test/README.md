# Testing

## Environment variables:

* `MA3ROUTE_KEY`: API key (**Required for unit tests**)
* `MA3ROUTE_SECRET`: API secret (**Required for unit tests**)
* `TEST_NO_NETWORK`: Skip tests that use network operations


## Running:

Running **all** tests:

```bash
$ npm run test
```

Run **all** tests, with coverage:

```bash
$ npm run test-coverage
```

Run **static analysis (linting)** tests:

```bash
$ npm run test:lint
```

Run **unit** tests:

```bash
$ npm run test:unit
```
