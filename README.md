# Тестовое задание backend developer

## Описание проекта:

Разработано серверное приложение согласно заданию (Express.JS + TypeScript + MongoDB). Реализованы все перечисленные фичи.
Админ добавляется автоматичски в базу данных.
Написана документация в Swagger.
Создан докер образ и залит на докер хаб.
Создан docker-compose.yml файл для того, чтобы создать контейнер с двумя сервисам (Приложение и база данных)

## Для разворачивания проекта нужно:

В терминале прописать:

- Создание директории `mkdir new-directory`
- Переход в директорию `cd new-directory/`
- Создание файла docker-compose.yml `touch docker-compose.yml`
- Открытие файла docker-compose.yml, чтобы его наполнить `nano docker-compose.yml`
- Ниже указанный текст поместить в файл docker-compose.yml

```
services:
  app:
    image: ieasyjet/reon_berezovsky
    container_name: app_reon_berezovsky
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - db
    environment:
      - MONGO_URI=mongodb://db/reon_berezovsky
      - NODE_ENV=dev
      - PORT=3000
      - SIMPLE_SECRET_KEY=dev-secret
      - PASSWORD_SECRET_KEY=cc88d6299c62851c4ee444506d639a49e4693dcb1b9300be29634bcd5b925d41
      - TOKEN_SECRET_KEY=e8e603a2d442efb85af1794c48f1f74dc94bf29459b257172b30b2d9025efd1b
      - ADMIN_NAME=adminReon
      - ADMIN_PASSWORD=tfyPGQK1

  db:
    image: mongo
    container_name: mongo_reon_berezovsky
    volumes:
      - ./data:/data/db
    ports:
      - '27017:27017'
```

- Сохранить содержимое файла docker-compose.yml
- В терминале ввести команду `docker-compose up` она запустит два сервиса. Убедиться, что ничего больше не запущено на 3000 порту!
- После сборки и получения лога о создании админа, можно тестировать

BASE_URL: `http://localhost:3000`

Данные от админа:

- name: `adminReon`
- password: `tfyPGQK1`

## Документация

Она расположена в корне проекта под названием `DocumentationForAPI.yaml`

Чтобы открыть документацию нужно перейти по [данной ссылки](https://editor.swagger.io/), в первом выпадающем списке меню `FILE` выбрать `Import File` и выбрать вышеуказанный файл.
