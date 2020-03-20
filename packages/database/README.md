# `database`

Database migration and seed files are stored in this package.

## How Tos

### Drop and rebuilt tables

Use `yarn run migrate`.

Internally it executes the following command(s):

- `npx knex migrate:rollback --all`
- `npx knex migrate:latest`

### Reset data (undo changes to tables and restore original data)

Use `yarn run seed`.

Internally it executes the following command(s):

- `npx knex seed:run`
