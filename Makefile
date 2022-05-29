GIT_BRANCH=gh-pages
GIT_URL=git@github.com:Ma3Route/node-sdk.git
VERSION=$(shell node -e "console.log(require('./package.json').version)")

push-docs:
	npm run docs
	rm -rf _out
	git clone -b ${GIT_BRANCH} ${GIT_URL} _out
	mv docs/ma3route-sdk/${VERSION} _out
	cd _out && \
		npm install && \
		npm run compile && \
		git add -A . && \
		git commit -a -m "v${VERSION} docs" && \
		git push origin ${GIT_BRANCH} && \
		rm -rf _out

.PHONY: push-docs
