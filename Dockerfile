FROM node:20-alpine AS builder
RUN apk add --no-cache bash
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm i
COPY . .
RUN ng build --configuration production --aot --output-hashing=all

FROM nginx:alpine AS production
COPY --from=builder app/dist/bingo/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
RUN apk add --no-cache bash
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]