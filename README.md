# Flash Card App
* An app for flash cards.


# Docker Set up
### Disclaimer: I'm not an expect at docker, so no fancy entry .sh files for easy set up. It's a work in progress though.
* Make sure you have docker installed
* Make sure config/config.js host of developent is set to 'psql'
* Run docker-compose up psql
* Run docker build node_server
* Run docker exec -it node_server node_server npx sequelize db:create
* Run docker exec -it node_server node_server npx sequelize db:migrate
* Run docker-compose up node_server
* Go to the frontend folder, and check that the proxy in the package.json is set to http://node_server:5000
* Run docker-compose build frontend
* Run docker-compose up frontend
