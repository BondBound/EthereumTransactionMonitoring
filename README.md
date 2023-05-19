<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Ethereum Transaction Monitoring

В  этом приложении реализованы следующие функции:

1. Сервис, который в фоновом режиме сохраняет информацию о транзакциях в базу данных Postgres и обновляет ее в режиме реального времени, постоянно сохраняя новые транзакции, появляющиеся в последних 100 блоках.

2. API-сервис с эндпоинтом, который предоставляет адрес с наибольшим изменением баланса за последние 100 блоков. Изменение баланса измеряется в абсолютной величине.

## Installation

Настройте файл .env в учетом Ваших требований.

```bash
$ npm install
```

```bash
$ typeorm migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Endpoints

```bash
# адрес с наибольшим изменением баланса за последние 100 блоков
$ http://localhost:3000/higher-balance-change/address

# номер последнего блока в сети 
$ http://localhost:3000/transactions/latest-block

# данные по конкретному блоку в сети
$ http://localhost:3000/transactions/:id
```