# Stage: Build dist files and folders
FROM node:13.10.1 as base

WORKDIR /var/www/tchr

RUN apt-get update && apt-get install -y apt-transport-https ca-certificates yarn

COPY . .

RUN yarn install
RUN yarn run build

# Stage: Install production node modules
FROM node:13.10.1-alpine AS release

WORKDIR /var/www/tchr

COPY --from=base /var/www/tchr/dist ./dist
COPY --from=base /var/www/tchr/package.json ./package.json

RUN touch ./.env
RUN echo "NODE_PORT=3002" >> ./.env
RUN echo "DB_CLIENT=mysql" >> ./.env
RUN echo "DB_HOST=localhost" >> ./.env
RUN echo "DB_NAME=tchr" >> ./.env
RUN echo "DB_USER=tchr_db_user" >> ./.env
RUN echo "DB_PASS=chercher" >> ./.env

RUN ls -al
RUN yarn install --production
RUN ls -al ./node_modules

EXPOSE 3002

CMD ["node", "--es-module-specifier-resolution=node", "./dist/index.js"]
