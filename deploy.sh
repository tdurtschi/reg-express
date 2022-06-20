#! /bin/bash

set -e

npm run build
git add dist/.
git commit --amend --no-edit
git subtree push --prefix dist origin gh-pages