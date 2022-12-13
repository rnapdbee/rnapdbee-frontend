ARG NODE_VERSION=16-alpine
ARG NGINX_VERSION=1.21-alpine
ARG BUILD_CONF=development

FROM node:${NODE_VERSION} AS build
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build -- -c ${BUILD_CONF}

FROM nginx:${NGINX_VERSION} AS runtime
COPY --from=build /app/dist/rnapdbee-frontend /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
