FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

EXPOSE 8080

CMD yarn run start:prod
