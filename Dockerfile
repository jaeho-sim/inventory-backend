FROM node:18-alpine as dependencies
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . . 

FROM dependencies as builder
RUN npm run build
EXPOSE 8000
CMD npm start
