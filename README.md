# d3hiring-nodejs-api-assessment
Technical assessment submission to D3 Hiring

## Assessment goals

### Complusory objectives

1. Develop API endpoints for teachers to perform administrative functions
2. Deploy as server app available in any publicly accessible hosting environments

### Goals

1. Develop API endpoints for teachers to perform administrative functions
2. Deploy server app to Heroku

### Optional stretch goal #1

- Deploy as Docker image to Heroku

### Optional stretch goal #2

- Create frontend web application that can allow teachers to perform administrative functions via browser.

## Getting started

### System requirements

Make sure the following are installed in development machine:

- Node.js v10.16.3 (if `nvm` is available and required version is installed, use `nvm use` command)
- Yarn

### Installation steps

Open terminal and run the following commands:

1. cd to project root folder
2. Run `yarn install` command
3. cd to `packages/server` folder
4. Run `yarn dev` command

## Files and folder structure

The repo is structured to be managed by [lerna.js](https://lerna.js.org/).

Server-side related code are to be kept in `server` package, while client-side related code are to be kept in `client` package. Shared code can be stored under `common` package, that is an internal package and should not be published.
