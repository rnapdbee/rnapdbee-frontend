ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=stable-alpine

FROM node:${NODE_VERSION} AS build
ARG BUILD_CONF=development
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run build -- -c ${BUILD_CONF}

FROM nginx:${NGINX_VERSION} AS runtime
COPY --from=build /app/dist/rnapdbee-frontend/browser /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
