FROM node:18.15 as builder
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --force

COPY . .
RUN npm run build

FROM nginx:1.23.3
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]