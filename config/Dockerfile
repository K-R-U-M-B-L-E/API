FROM node:alpine

# RUN mkdir -p /usr/src/app ==> commande windows

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm ci

RUN npm install

COPY . /usr/src/app

EXPOSE 3001

CMD [ "npm", "start" ]

