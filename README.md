# Grafana / MongoDB test setup

This is a simple setup to test Grafana's plataform, with MongoDB database, and a Node.js Express back-end as a middleware.

## Setup

Run the docker compose command to start the containers.

```SSH
docker compose up --build
```

## MongoDB

Place in [mongo/init-scripts/init.js](./mongo/init-scripts/init.js) querys to execute on Docker mount.

To access MongoDB directly through the command line, run this command:

```SSH
docker exec -it mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

## Node.JS

To fetch data from MongoDB with a custom query, make a `POST` request to `http://localhost:3001/query`, and pass the query in the body as a JSON structure.

To create custom data outside MongoDB, check the [node-api/data/README](./node-api/data/README.md).

The docker-compose file sets the local `node-api` directory as a volume, so there's no need to re-mount the image on changes applied to the `node-api/data`.
