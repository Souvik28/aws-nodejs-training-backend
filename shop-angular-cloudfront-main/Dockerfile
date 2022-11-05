FROM node:16.3.0-alpine as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/app /usr/share/nginx/html