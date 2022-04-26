#!/usr/bin/env -S bash -i

docker-compose -f deployments/development.yaml restart server
