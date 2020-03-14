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

Open terminal and run the following commands:

1. cd to project root folder
2. Run `yarn install` command
3. Run `yarn run init:db` command
4. cd to `packages/server` folder
5. Run `yarn run dev` command

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

## Tasks & user stories

| # | User story | Completed |
|---|---|---|
| 1 | As a teacher, I want to register one or more students to a specified teacher. | No |
| 2 | As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers). | No |
| 3 | As a teacher, I want to suspend a specified student. | No |
| 4 | As a teacher, I want to retrieve a list of students who can receive a given notification. | No |

---

| Task | Completed |
|---|---|
| Setup eslint | Done |
| Write unit tests | No |
| Create server app | In Progress |
| Create client app | No |
| Create test script | Yes |
| Create lint script | No |
| Create dev script | In Progress |
| Create build script | No |

## Security concerns

- Implement API keys?
- Implement CSRF?
- Rate limiting?

## Assumptions

// TODO. Any assumptions about app behaviours can be added here

## Available scripts

### yarn run test

// TODO. Add ava unit tests

Runs unit tests on all packages.

### yarn run lint

Runs eslint checks on all packages.

### yarn run dev

// TODO. Setup script

Starts `server` app in development mode

### yarn run build

// TODO. Setup script

Creates production build for all packages.

### yarn run init:db

// TODO. Setup script

Setups database, and then runs `yarn run reset:db` to start migration and seeding.

### yarn run reset:db

// TODO. Setup script

Resets database used by `server` app, including migration and seeding.

## Git

Branches in this repo is maintained using `GitFlow` style. Hubflow provides add-on cli tools to existing `git` command to manage branches in `GitFlow` style.

## Files and folder structure

The repo is structured to be managed by [lerna.js](https://lerna.js.org/).

- Server-side related code are kept in `server` package.
- Client-side related code are kept in `client` package.
- Shared code can be stored under `common` package, that is an internal package and should not be published.
- Database related code, such as migrations and seeding are kept in `database` package.

## Remote server setup

// TODO. Add diagrams.

## Known issues

### ESM module loader is experimental.

When server app is initialised, the following message will appear:

`(node:35224) ExperimentalWarning: The ESM module loader is experimental.`

This message appears since the server app is developed as an ESM module, and running/loading of ESM modules are still part of experimental features. It should go away once ESM is part of Node.js stable release.

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
