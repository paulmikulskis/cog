FROM node:16.16.0-alpine

ARG VERSION_TAG

WORKDIR /apps

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

