# auth-backend

Backend to implement user sign in authentication and register with session management and middleware.

## Built With

- Node.js
- Express
- PostgreSQL
- Redis

## Prerequisites

If running locally, you must have postgres and redis installed and running. You can then modify the values in `config.js` to connect to both postgres and redis. Refer to method #1.

If you have docker installed, refer to method #2.

## Installation - Method #1

- Run `npm install` to install dependencies
- Run `npm start` to start the application

## Installation - Method #2

- Run `docker-compose up --build` to start up the project
- Run `docker-compose down` to bring down the project
