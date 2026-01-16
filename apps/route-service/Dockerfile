FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npx nest build route-service

CMD ["node", "dist/apps/route-service/main"]