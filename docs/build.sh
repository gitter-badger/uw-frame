#!/bin/bash

pushd ..;

npm run build-static

rm -rf docs/target
mkdir -p docs/target

cp -r uw-frame-static/target/* docs/target

popd

bower install

cp -r bower_components/marked bower_components/angular-marked target/bower_components

cp -r js home demo markdown my-app config.js index.html target/
