# syntax=docker/dockerfile:1
FROM node:lts-alpine
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
