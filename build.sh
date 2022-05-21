#!/bin/sh

export GIT_SHA=$(git rev-parse --short HEAD)
#export BUILD_DOMAIN=$(test -e .domains && cat .domains)

yarn build
