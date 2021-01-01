#!/bin/bash

# abort on errors
set -e

# build
npm run build
npm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

touch .nojekyll
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ismail9k/vue3-carousel.git master:gh-pages
cd -
