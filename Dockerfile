FROM node:22-alpine AS build

RUN mkdir /react-app

WORKDIR /react-app

# install dependencies
COPY ./ ./
RUN npm install

# Default command
# we list out all the commands that we want to run when the container is first created
CMD [ "npm", "run", "dev" ]
EXPOSE 3000