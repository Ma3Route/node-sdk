#
# Deploy to the gh-pages
#


#
# Algorithm used while generating and pushing documentation
#
# - check if this is a commit on the master branch. If true, continue.
#   Otherwise exit
# - ensure it is not a pull-request not being drafted to master branch.
#   If true, continue. Otherwise, exit
# - generate the documentation immediately
# - clone the repo into a directory `_out.`
# - cd into the cloned repo
# - checkout the gh-pages branch
# - check if documentation with current version does not exist. If true,
#   contine. Otherwise exit
# - copy over the documentation
# - git add and commit the changes, marking it with the version of
#   generated docs
# - add github access token to allow pushing to repo
# - git push to the gh-pages and exit
#


# we must stop on error
set -e


# we require utilities
source script/utils.sh


# variables
LOG_TITLE="gh-pages"
GH_URL="https://github.com/Ma3Route/node-sdk"


# ensure we are on master branch
[ ${TRAVIS_BRANCH} != "master" ] && {
    log "we are not on master branch (${TRAVIS_BRANCH})" 2
    exit
}


# ignore pull requests
[ ${TRAVIS_PULL_REQUEST} == false ] || {
    log "it is another awesome pull-request" 2
    exit
}


log "building docs" 0
grunt docs


log "cloning repo" 0
git clone "${GH_URL}" _out


log "getting into repo and switching branches" 0
cd _out
git checkout gh-pages


# ensure there is a version bump
VERSION="$(node -e "console.log(require('../package.json').version)")"
[ -d ${VERSION} ] && {
    log "version bump required" 2
    exit
}


log "copying jsdoc output" 0
mv ../docs/ma3route-sdk/${VERSION} .


log "configuring and comitting changes" 0
git config user.email "mugo@forfuture.co.ke"
git config user.name "GochoMugo"
git add -A .
git commit -a -m "v${VERSION} docs"


log "adding github authentication token" 0
echo -e "machine github.com\n  login mugo@forfuture.co.ke\n  password ${GH_TOKEN}" >> ~/.netrc


log "pushing to gh-pages branch" 0
git push origin gh-pages \
  && log "successfully pushed to gh-pages" 1 \
  || log "failed to push to gh-pages" 2
