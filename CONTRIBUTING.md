
# Contributing to ma3route's node-sdk


## Issues:

Before opening a new issue, ensure that it has **not** already been addressed in another issue (whether it's open or closed). This helps ensure discussions are organized into one related issue.

Opening such a duplicate issue, will force us to close it, mark it as **duplicate** and redirect/reference users to the first of this issue reported.


## Code Contribution:

> We are glad that you can take the time and help us improve this SDK.

We are using Git branching model identical to [this one](http://nvie.com/posts/a-successful-git-branching-model/). Ensure you read that please.

### 1. Fork

Fork the [Github repo](https://github.com/ma3route/node-sdk) and clone your copy locally:

```bash
$ git clone https://github.com/yourUsername/node-sdk.git
$ cd node-sdk
```

### 2. Branch

Which branch you base your commits on, depends on your agenda. If you are implementing new features, use the **develop** branch.

```bash
$ git checkout develop
```

If you are simply fixing some bugs, use the **master** branch.

```bash
$ git checkout master
```

Ensure you checkout your own branch with a suitable name. For example, if you are working to fix a reported bug:

```bash
$ git checkout -b hotfix-issue-22
```

If it was a new feature *(called awesome thing)*:

```bash
$ git checkout -b feature-awesome-thing
```


### 3. Commits

To ensure our git history is not bloated, we ask contributors to rebase your commit together into as few commits as possible before sending the pull request.

```bash
$ git rebase --interactive
```

See [this post](http://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/) for help in rebasing.


### 4. Send PR

Once you are done, just send us a Pull Request and we shall discuss on getting it merged into upstream repo.


## tests:

Also, ensure that all the tests are accompanied with tests. We might help you with that (but **no** promises). This helps ensure our SDK does **not** break unexpectedly.


## licensing:

All code in this repository is licensed under the **[MIT license][license]**.

By contributing to this project, you agree to submit your code and other contributions under the **[MIT license][license]**. See the license [here][license].


> Happy Coding! :dancer:

[license]: https://github.com/Ma3Route/node-sdk/blob/master/LICENSE "view license"
