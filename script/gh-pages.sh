#
# Deploy to the gh-pages
#


# we must stop on error
set -e


# we require utilities
source ./script/utils.sh


# variables
GH_URL="https://github.com/Ma3Route/node-sdk"


# ensure we are on master branch
[ ${TRAVIS_BRANCH} != "master" ] && exit


# ignore pull requests
[ ${TRAVIS_PULL_REQUEST} ] || exit


log "building docs" 0
grunt docs


log "cloning repo" 0
git clone "${GH_URL}" _out


log "changing to the gh-pages branch" 0
git checkout gh-pages


log "getting into repo and removing all current files" 0
cd _out
git rm -rf *
rm -rf *


log "copying jsdoc output to master branch" 0
cp -r ../docs/* .


log "configuring and committing changes" 0
git config user.email "mugo@forfuture.co.ke"
git config user.name "GochoMugo"
git add -A .
git commit -a -m "Build ${TRAVIS_BUILD_NUMBER}"


log "adding authentication key" 0
echo -e "machine github.com\n  login mugo@forfuture.co.ke\n  password ${GH_TOKEN}" >> ~/.netrc


log "pushing to gh-pages branch" 0
git push origin gh-pages \
  && log "successfully pushed to gh-pages" 1 \
  || log "failed to push to gh-pages" 2
