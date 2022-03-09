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

Nest provide a [Swagger CLI Plugin](https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin) to automatically generate the types definition

```typescript
// add this to nest-cli.json
"compilerOptions": {
  "plugins": ["@nestjs/swagger"]
}
```

### Basic Config

It is necessary add [SwaggerModule](https://docs.nestjs.com/openapi/introduction#bootstrap) config in `main.ts` file.
After that it is possible to see OpenAPI specification accessing http://localhost:3000/api

## Prisma

[NestJS with Prisma documentation](https://docs.nestjs.com/recipes/prisma)

```bash
# add prisma
npm install prisma

# initialize prisma
npx prisma init

# add prisma client
npm install @prisma/client
```

### Add Prisma model and run migration

Prisma model must be placed in `schema.prisma`

```bash
# running migration
npx prisma migrate dev --name init
```

### Seed some items and categories

Inside `prisma/seed.td` will have a database seed to Items and Categories. More information can be find [here](https://www.prisma.io/docs/guides/database/seed-database).

```bash
# add in package.json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}

# run seed
npx prisma db seed

# check in studio if all is right
npx prisma studio
```

### Create a module and service for PrismaClient

```bash
# create module
nest generate module prisma

# create service
nest generate service prisma
```

Makes Prisma module as Global and import in AppModule, this way any module can inject PrismaService without the need to import PrismaModule.

## Create resources

```bash
# create resource
nest generate resource categories
```

```typescript
// add ApiTags in Controller to group categories endpoints on Swagger
@Controller('categories')
@ApiTags('categories')
export class CategoriesController {...}

// inject PrismaService in CategoriesService
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}

// add ApiProperty in DTOs to appears on Swagger
export class CreateCategoryDto {
  @ApiProperty()
  name: string;
}

// add ApiProperty in Entities to appears on Swagger
export class CategoryEntity implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

// add decorator response on endpoints
@Post()
@ApiCreatedResponse({ type: CategoryEntity })
create(@Body() createCategoryDto: CreateCategoryDto) {
  return this.categoriesService.create(createCategoryDto);
}

// create resources to Items...
```

## Validations

Nest has a build in `ValidationPipe` which uses the powerful `class-validator` package to filter and validate requests.

```bash
# install dependencies
npm install class-transformer class-validator
```

```typescript
// add ValidationPipe in main.ts
app.useGlobalPipes(new ValidationPipe());

// add decorators in DTOs
@IsNotEmpty()
@MinLength(3)

// transform/serialize responses, add follow line in main.ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
