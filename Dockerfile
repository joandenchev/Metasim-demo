FROM node:22-slim AS build

LABEL author="Joan Denchev"

WORKDIR /service/client

COPY client/package*.json ./

RUN npm i --omit=dev

COPY client ./

RUN npm run build

FROM node:22-slim

WORKDIR /service/server

COPY server/package*.json ./
RUN npm i --omit=dev

COPY --from=build /service/server/dist ./dist
COPY server ./

EXPOSE 42000

CMD ["npm", "run", "startHttps"]