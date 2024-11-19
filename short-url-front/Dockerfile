FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS run
ENV TZ=UTC
COPY --from=build /app/dist/ /dist/
COPY default.conf /etc/nginx/conf.d/default.conf