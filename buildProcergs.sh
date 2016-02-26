#!/bin/bash
npm run build-js && npm run build-css
cp /home/daniel-tavares/TC/workspace/rsp/src/main/webapp/js/rsp.js /home/daniel-tavares/TC/wildfly-10.0.0.Final/standalone/deployments/rsp.war/js/