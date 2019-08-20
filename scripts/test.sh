#!/bin/sh
yarn lint
yarn flow
yarn test --coverage
