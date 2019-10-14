# This is to build our container
FROM node:latest
# Create an app dir in container
RUN mkdir /usr/src/app
# Change to that directory
WORKDIR /usr/src/app
# Copy package.json to workdir
COPY package*.json ./
# Do I even need to explain?
RUN npm install
# Copy every from here to here...?
COPY . .
# Expose Port 5000
EXPOSE 5000



