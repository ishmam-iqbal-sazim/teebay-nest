FROM node:18-alpine

WORKDIR /teebay-app

COPY . ./

RUN npm install --silent

EXPOSE 5173

CMD ["npm", "run", "dev"]