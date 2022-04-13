#!/bin/bash
docker-compose -f deployments/development.yaml down
# delete images
docker image rm deployments_server
docker image rm deployments_frontend