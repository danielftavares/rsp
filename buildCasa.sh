#!/bin/bash
npm run build-js && npm run build-css
cp /home/daniel/Java/rsp/src/main/webapp/js/rsp.js /home/daniel/Java/wildfly-10.0.0.Final/standalone/deployments/rsp.war/js/
