FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npx nest build report-service

CMD ["node", "dist/apps/report-service/main"]