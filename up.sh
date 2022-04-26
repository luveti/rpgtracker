#!/bin/bash
docker-compose -f deployments/development.yaml up --force-recreate -d
