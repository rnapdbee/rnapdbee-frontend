ARG NODE_VERSION=22-alpine
ARG NGINX_VERSION=stable-alpine

FROM node:${NODE_VERSION} AS build
ARG BUILD_CONF=development
ARG API_HOST=http://localhost
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN sed -i "s|export const HOST = 'http://localhost';|export const HOST = '${API_HOST}';|" src/environments/environment.ts
RUN npm run build -- -c ${BUILD_CONF}

FROM nginx:${NGINX_VERSION} AS runtime
COPY --from=build /app/dist/rnapdbee-frontend/browser /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
