FROM node:20.10.0

WORKDIR /app

COPY package.json /app
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8080
CMD ["yarn", "start"]