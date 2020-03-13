# d3hiring-nodejs-api-assessment
Technical assessment submission to D3 Hiring

For this assessment, all packages will be under `@tchr` namespace. `@tchr` is the system that assists teachers to perform administrative functions.

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

## Tasks

| Task | Completed |
|---|---|
| Write unit tests | No |

## Getting started

### System requirements

Make sure the following are installed in development machine:

- Node.js v13.10.1 (if `nvm` is available and required version is installed, use `nvm use` command)
- Yarn
- [Hubflow](https://datasift.github.io/gitflow/TheHubFlowTools.html) (if you intend to add new branches)

### Installation steps

Open terminal and run the following commands:

1. cd to project root folder
2. Run `yarn install` command
3. cd to `packages/server` folder
4. Run `yarn dev` command

## Git

Branches in this repo is maintained using `GitFlow` style. Hubflow provides add-on cli tools to existing `git` command to manage branches in `GitFlow` style.

## Files and folder structure

The repo is structured to be managed by [lerna.js](https://lerna.js.org/).

Server-side related code are to be kept in `server` package, while client-side related code are to be kept in `client` package. Shared code can be stored under `common` package, that is an internal package and should not be published.

## Known issues

### ESM module loader is experimental

When server app is initialised, the following message will appear:

`(node:35224) ExperimentalWarning: The ESM module loader is experimental.`

This message appears since the server app is developed as an ESM module, and running/loading of ESM modules are still part of experimental features. It should go away once ESM is part of Node.js stable release.
