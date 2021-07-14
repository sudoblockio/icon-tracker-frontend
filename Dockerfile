# build environment
FROM node:12.20.2-buster as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY . /app
RUN npm install
RUN npm run build

# FOR TESTING
#CMD ["npm", "run", "start"]

# production environment
FROM nginx:1.17 as prod
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

#FROM nginx:1.17 as test
