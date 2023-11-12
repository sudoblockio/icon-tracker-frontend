# build environment
FROM node:20.8.0-alpine3.18 as build

ARG REACT_APP_NETWORK_NAME
ENV REACT_APP_NETWORK_NAME ${REACT_APP_NETWORK_NAME}
ARG REACT_APP_RPC_ENDPOINT
ENV REACT_APP_RPC_ENDPOINT ${REACT_APP_RPC_ENDPOINT}
ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT ${REACT_APP_API_ENDPOINT}
ARG REACT_APP_WSS_ENDPOINT
ENV REACT_APP_WSS_ENDPOINT ${REACT_APP_WSS_ENDPOINT}
ARG REACT_APP_NID
ENV REACT_APP_NID ${REACT_APP_NID}

ARG REACT_APP_DEPLOYMENT_ENVIRONMENT
ENV REACT_APP_DEPLOYMENT_ENVIRONMENT ${REACT_APP_DEPLOYMENT_ENVIRONMENT:-prod}

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install

COPY . .

RUN apk --no-cache upgrade

RUN npm run build

# production environment
FROM nginx:1.21
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

## testing
## TODO: Add test
#FROM build as test
#CMD ["npm", "test"]
