#!/bin/bash

# abort on errors
set -e

npm publish
git push --tags
