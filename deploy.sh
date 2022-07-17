#! /bin/bash

set -e

npm run build
git add dist/.
git commit -m "build"
git subtree push --prefix dist origin gh-pages
git reset --hard origin/main