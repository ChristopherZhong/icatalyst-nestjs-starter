# ICatalyst NestJS Starter

This project was initialized with the following command to scaffold a [Nest](https://github.com/nestjs/nest) framework TypeScript starter project.

```shell
npx @nestjs/cli new --directory . <project-name>
```

Static code analysis is done by [ESLint](https://eslint.org/) and code formatting is done by [Prettier](https://prettier.io/).
These tools are used automatically to check the code using a [pre-commit](./.husky/pre-commit) [Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) set up by [husky](https://typicode.github.io/husky/#/) and [lint-staged](https://github.com/okonet/lint-staged).
The tools were installed using following command.

```shell
npx mrm@2 lint-staged
```

Two pre-commit hooks are provided: [prepare-commit-msg](./.husky/prepare-commit-msg) and [commit-msg](./.husky/commit-msg).
The [prepare-commit-msg](./.husky/prepare-commit-msg) hook that will automatically append a [JIRA](https://www.atlassian.com/software/jira) issue number to the commit message.
The [commit-msg](./.husky/commit-msg) uses the [commitlint](https://github.com/conventional-changelog/commitlint) tool to lint commit messagea according to the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
The configuration file [.commitlintrc.yml](./.commitlintrc.yml) can be used to further configure the tool.

## Usage

The following sections describe the usage of this project.

### Installation

To set up and run this project locally, run the following command.
The command will install all the dependencies and set up the Git hooks.

```shell
npm install
```

### Running the app

To run this project locally, use one of the following commands.
There are some external dependencies that needs to be available before starting this project locally.
See the [External Dependencies](#external-dependencies) section for more information.

```shell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

This project is also configured to run using Docker.
Docker Compose files are provided ([docker-compose.yml](./docker-compose.yml) and [docker-compose.local.yml](./docker-compose.local.yml)) that can be used to run this project using Docker.
A convenience script ([up](./scripts/up)) is provided to start this project as follows.

```shell
./scripts/up <service>
```

Furthermore, the Docker Compose is already configured to allow remote debugging.
In addition, a Visual Studio Code [launch.json](./.vscode/launch.json) is provided that can attach the debugger to the running container.

### Test

To test this project, use one of the following commands.
Note that the e2e (end-to-end) tests require the external dependencies to be available.

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

_Warning_: If the same database is reused for development and running the e2e tests, the contents of that database will be wiped.
As an alternative, a [test-e2e](./scripts/test-e2e) script is provided that can be used to run the e2e tests.
The script automatically start the external dependencies and configure a different database for the e2e tests.

### NestJS

Use the `@nestjs/cli` to create a resource.
The following example is the command used to generate the `users` resource.

```shell
npx nest generate resource users
```

The above command is roughly equivalent to the following series of commands.
The `dto` and `entities` have to be created manually.

```shell
npx nest generate module users
npx nest generate controller users
npx nest generate service users
```

## External Dependencies

### Database

This project uses a [PostgreSQL](https://www.postgresql.org/) database.
Connection to the database is through the [Prisma](https://www.prisma.io/) ORM library.
Prisma provides a CLI that can be used to initialize or add Prisma.
Install the CLI using the following commands.

```shell
# adds the Prisma CLI as a dev dependency
npm install --save-dev prisma
# initialize/add Prisma to the project
npx prisma init
```

Further details on getting started with Prisma can be read at https://www.prisma.io/docs/getting-started.
Further details on NestJS integration with Prisma can be read at https://docs.nestjs.com/recipes/prisma.

When Prisma is initialized, a [prisma](./prisma) directory is created that contains the schema file ([schema.prisma](./prisma/schema.prisma)).
Based on the schema, Prisma will generate a client that can be used to interact with the database.
This client can be installed using the following command.

```shell
npm install @prisma/client
```

Further information on how to use the Prisma client is at https://www.prisma.io/docs/reference/api-reference/prisma-client-reference.

Further details on the specifications of the schema is at https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference and https://www.prisma.io/docs/concepts/components/prisma-schema.
And since the underlying database is PostgreSQL, specific details on how Prisma interacts with PostgresSQL is at https://www.prisma.io/docs/concepts/database-connectors/postgresql.

#### Schema Development Workflow

The Prisma CLI provides ways to aid in the development of models.
When there is an initial model, the following command creates a migration file, syncs the database, and updates the Prisma client.
Further details are located at https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate, https://www.prisma.io/docs/concepts/components/prisma-migrate, and https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate.

```shell
npx prisma migrate dev --name <name-of-migration>
```

Deploying migrations to production is as simple as the following command.

```shell
npx prisma migrate deploy
```

When developing Prisma models for PostgreSQL, further details on the type mappings is at https://www.prisma.io/docs/concepts/database-connectors/postgresql#type-mapping-between-postgresql-to-prisma-schema.

#### Environment Variable(s)

There are five database environment variables and one Prisma environment variable.
The database environment variables are used in the [docker-compose.yml](./docker-compose.yml) file for the `database` service.
And the Prisma environment variable is used in the Prisma schema file in the `env()`.

```dotenv
# Database
DATABASE_HOST=localhost
DATABASE_NAME=nestjs
DATABASE_PASSWORD=password
DATABASE_PORT=5432
DATABASE_USER=nestjs

# Prisma
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public
```

## Environment Variable(s)

The following is a combined list of environment variables and example values.

```dotenv
# APP
APP_PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_HOST=localhost
DATABASE_NAME=nestjs
DATABASE_PASSWORD=password
DATABASE_PORT=5432
DATABASE_USER=nestjs

# Prisma
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public
```
