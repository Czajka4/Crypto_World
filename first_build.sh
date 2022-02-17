#!/bin/bash

# Exit if erro
set -e

# Build and run containers
docker-compose up -d
sleep 5;

# Run db migrations
docker-compose run --rm backend alembic upgrade head
sleep 3;

# Create initial data
docker-compose run --rm backend python3 app/initial_data.py