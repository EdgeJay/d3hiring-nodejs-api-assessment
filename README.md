# d3hiring-nodejs-api-assessment
Technical assessment submission to D3 Hiring

For this assessment, all packages will be under `@tchr` namespace. `@tchr` is the system that assists teachers to perform administrative functions.

## Getting started

### System requirements

Make sure the following are installed in development machine:

- Node.js v13.10.1 (if `nvm` is available and required version is installed, use `nvm use` command)
- Yarn
- [Hubflow](https://datasift.github.io/gitflow/TheHubFlowTools.html) (optional, only if you intend to make changes to this repo)

### Installation steps

Create `.env` file under `packages/server` folder with the following content:

```
NODE_PORT=3002

# Database settings
DB_CLIENT=mysql

# mysql instance within same Docker bridge network
DB_HOST=tchr-mysql
DB_NAME=tchr
DB_USER=tchr_db_user
DB_PASS=tchr_db_user_password
```

Create `.env` file under `packages/database` folder with the following content:

```
NODE_PORT=3002

# Database settings
DB_CLIENT=mysql

# mysql instance within same Docker bridge network
DB_HOST=localhost
DB_NAME=tchr
DB_USER=tchr_db_user
DB_PASS=tchr_db_user_password
```

Open `docker-compose.yml` file and set MySQL database root user's password by changing the following line:

`MYSQL_ROOT_PASSWORD=root_password`

Open terminal and run the following commands in project root folder:

1. `yarn install`
2. `docker-compose build`
3. `docker-compose up -d`
4. Run `docker ps` and make sure `tchr-mysql` and `tchr-server` containers are running.

To setup database:

1. Open SQL client and connect to MySQL database at `127.0.0.1:3306`, using username(root) and password(set in docker-compose.yml file).
2. Load SQL script at `packages/database/scripts/bootstrap.sql` and replace `'your_db_password_here'` (Make sure it matches value assigned to DB_PASS variable in `.env` files).
3. Run all SQL queries.
4. Make sure `tchr` database is created and `tchr_db_user` is added to `mysql.user` table.
5. cd to `packages/database` folder.
6. Run `yarn run migrate` to create database tables.
7. Run `yarn run seed` to seed database tables with data.

And you are good to go!

## Assessment goals

### Complusory objectives

1. Develop API endpoints for teachers to perform administrative functions
2. Deploy as server app available in any publicly accessible hosting environments

### Goals

1. Develop API endpoints for teachers to perform administrative functions
2. Deploy server app to Heroku

### Optional stretch goal #1

- ~~Deploy as Docker image to Heroku~~
- Deployed to Digital Ocean droplet instead

### Optional stretch goal #2

- [NOT DONE] Create frontend web application that can allow teachers to perform administrative functions via browser.


### Optional stretch goal #3

- [NOT DONE] Server-side rendered frontend web application.

## Tasks & user stories

| # | User story | Completed |
|---|---|---|
| 1 | As a teacher, I want to register one or more students to a specified teacher. | Yes |
| 2 | As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers). | Yes |
| 3 | As a teacher, I want to suspend a specified student. | Yes |
| 4 | As a teacher, I want to retrieve a list of students who can receive a given notification. | Yes |

---

| Task | Completed |
|---|---|
| Setup eslint | Yes |
| Write unit tests | In Progress |
| Create server app | Yes |
| Create client app | No |
| Create test script | Yes |
| Create lint script | Yes |
| Create dev script | Yes |
| Create build script | Yes |

## Security concerns

- SQL injection
- Implement API keys?
- Implement CSRF?
- Rate limiting?
- Remote code execution
- 405 method not allowed
- Check content-type header, if not match return 406 Not Acceptable
- Use uuid instead of auto incrementing identifiers
- Invalid email inputs?
- Guessing of email addresses by brute force?

## Available scripts

### yarn run test

Runs unit tests on all packages.

### yarn run lint

Runs eslint checks on all packages.

### yarn run build

Creates production build for all packages.

## Git

Branches in this repo is maintained using `GitFlow` style. Hubflow provides add-on cli tools to existing `git` command to manage branches in `GitFlow` style.

## Files and folder structure

The repo is structured to be managed by [lerna.js](https://lerna.js.org/).

- Server-side related code are kept in `server` package.
- Client-side related code are kept in `client` package.
- Shared code can be stored under `common` package, that is an internal package and should not be published.
- Database related code, such as migrations and seeding are kept in `database` package.

## 3rd-party libraries

This repo used the following 3rd-party libraries for various tasks:

### [Koa.js](https://koajs.com/)

Backbone of server app. Handles routing, incoming/outgoing requests/responses. Very similar to Express.

### [Knex](http://knexjs.org/)

Database query builder, migration and seeding.

### [Objection](https://vincit.github.io/objection.js/)

ORM for Knex.

### [dotenv](https://github.com/motdotla/dotenv)

Loads app environment variables from .env files.

### [Pino](https://github.com/pinojs/pino)

Node.js logger.

## Unit tests

This repo uses [ava](https://github.com/avajs/ava) as the test runner.

For packages that use Typescript, files must be compiled into Javascript first before running unit tests, as current methods to get `ava` to run tests on Typescript files on-the-fly are not straightforward.

## (Re)building Docker image for server app

Note: Dockerfile copies `/packages/server/.env` file when building Docker image, make sure `.env` is configured properly before building image.

```
cd packages/server
yarn run docker:build // runs the following command: docker build -t edgejay/tchr-server-image .
```

## Remote server setup

> TODO. Add diagrams.

### Deploying Docker containers in DigitalOcean droplet

1. docker login -u <username> -p <password> OR cat ~/docker-password.txt | docker login -u <username> --password-stdin
2. docker-machine create --digitalocean-size "s-1vcpu-1gb" --driver digitalocean --digitalocean-access-token <personal_access_token> <machine_name>
3. eval $(docker-machine env <machine_name>) // Load env variables
4. docker container run --name <container_name> --publish <exposed_port>:<internal_port> --env MYSQL_ROOT_PASSWORD=<some_value> --detach mysql:5.7
5. docker ps // Check if container is running
6. Repeat steps 4 - 5 to add more containers.

Note: `*-alpine` images do not have `bash` installed, use `ash`.

### Deploying Docker containers in DigitalOcean droplet using docker-compose

1. docker login -u <username> -p <password> OR cat ~/docker-password.txt | docker login -u <username> --password-stdin
2. docker-machine create --digitalocean-size "s-1vcpu-1gb" --driver digitalocean --digitalocean-access-token <personal_access_token> <machine_name>
3. eval $(docker-machine env <machine_name>) // Load env variables
4. docker-compose up -d

## Known issues

### ESM module loader is experimental.

One of the goals when building the server app is for it to be "babel-less", meaning able to run the app without transpiling its codebase first. However there are some drawbacks with this approach.

When server app is initialised, the following message will appear:

`(node:35224) ExperimentalWarning: The ESM module loader is experimental.`

This message appears since the server app is developed as an ESM module, and running/loading of ESM modules are still part of experimental features. It should go away once ESM is part of Node.js stable release.

Another alternative is to import the [esm node module](https://www.npmjs.com/package/esm).

### Eslint cannot be run in "module" type packages.

Currently eslint still uses CommonJS style of loading modules, support for ESM-style modules will only be available after Node.js with support of ESM-style modules in production is released.

This causes eslint to fail when running `eslint` in packages that are defined as "module" via `type` field in `package.json` files. The workaround adopted by this project is to remove `type` field in `package.json` file as base of package folder, and create another `package.json` file in `src` folder with the following config:

```
{
  "type": "module"
}
```

[UPDATE 13 March 2020]

The above solution does not work well as it confuses node when it tries to locate libraries added via import statement. Instead of referring to `package.json` file in `packages/server`, it tried to search for dependencies declared in `packages/server/src`.

Final solution is to add `"type": "module"` to `packages/server/package.json`, and move `.eslintrc.js` file to project root.

### Importing without .js extension

We are used to having tools and IDEs like webpack and VS code to automatically resolve file imports without including ".js" extension.

For this project since I want to achieve as close as native code implementation as possible without augmenting code with additional polyfills and plugins as much as possible, to support resolution of extension-less file imports, I need to use --es-module-specifier-resolution=node flag when starting the server app with node.

## References

https://2ality.com/2019/04/nodejs-esm-impl.html
https://owasp.org/www-project-top-ten/
https://www.templarbit.com/blog/2018/01/10/api-security-checklist/
https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32006#issuecomment-453111178
https://github.com/nodejs/node/issues/30927#issuecomment-575998045
