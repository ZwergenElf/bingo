FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:prod

FROM nginx:alpine AS production
COPY --from=builder app/dist/bingo/browser /usr/share/nginx/html/bingo
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080