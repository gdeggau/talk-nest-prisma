## Installation

```bash
# install nest as a global library
npm i -g @nestjs/cli

# create a new nest project
nest new project-name
```

## Overview

- **Controller** - Responsible for handle HTTP request from client. It get the request, parse it, delegate respective params to providers and send a response to the client.

- **Providers** - Are services, repositories, factories, helpers... All that will be injected as dependency.

- **Service** - It's used to implement business rules, normally saving and retrieving data from a storage.

- **Module** - It's a set of relationed capabilities. A module accepts a object with following properties:
  - _providers_ - the providers that will be instantiated by the Nest injector and that may be shared at least across this module
  - _controllers_ - the set of controllers defined in this module which have to be instantiated
  - _imports_ - the list of imported modules that export the providers which are required in this module
  - _exports_ - the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

```bash
# add swagger dependencies
npm install --save @nestjs/swagger swagger-ui-express
```

### Basic Config

It is necessary add [SwaggerModule](https://docs.nestjs.com/openapi/introduction#bootstrap) config in `main.ts` file.
After that it is possible to see OpenAPI specification accessing http://localhost:3000/api

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
