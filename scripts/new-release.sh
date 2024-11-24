#!/bin/bash

# abort on errors
set -e

npm run build

git push --tags
git push
npm publish