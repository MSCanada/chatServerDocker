#!/bin/bash
set -e

if [ "$ENV" = 'DEV' ]; then
  echo "Running Development Server"
elif [ "$ENV" = 'UNIT' ]; then
  echo "Running Unit Tests"
else
  echo "Running Production Server"
  exec node ./chatServer.js
fi
