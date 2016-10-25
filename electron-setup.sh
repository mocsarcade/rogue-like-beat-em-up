#!/bin/bash

node build
cp ./electron-bootstrap.js ./builds/web/electron-bootstrap.js
cp ./package.json ./builds/web/package.json

echo "run the following to start electron:"
echo "    $ electron ./builds/web"
