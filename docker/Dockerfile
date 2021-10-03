FROM node:alpine

RUN mkdir /app
RUN mkdir /uploads

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD yarn run start:prod
