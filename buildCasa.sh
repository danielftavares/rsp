#!/bin/bash
npm run build-js && npm run build-css
cp /home/daniel/Documents/pos_unisc/TC/workspace/rsp/src/main/webapp/js/rsp.js /home/daniel/Documents/pos_unisc/TC/wildfly-9.0.2.Final/standalone/deployments/rsp.war/js/
