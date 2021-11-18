# build environment
FROM node:12.22.4-alpine as build

ARG NETWORK_NAME
ENV NETWORK_NAME ${NETWORK_NAME:-mainnet}

ARG DEPLOYMENT_ENVIRONMENT
ENV DEPLOYMENT_ENVIRONMENT ${DEPLOYMENT_ENVIRONMENT:-prod}

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn install

COPY . .

RUN apk --no-cache upgrade

RUN yarn run build

# production environment
FROM nginx:1.17 as prod
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# testing
# TODO: Add test
FROM build as test
CMD ["yarn", "test"]
