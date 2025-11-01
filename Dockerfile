FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm i
COPY . .
RUN ng build --configuration production --output-path=dist/bingo/browser

FROM nginx:alpine AS production
COPY --from=builder app/dist/bingo/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
