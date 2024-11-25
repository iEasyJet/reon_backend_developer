"use strict";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_SERVER } = process.env;
/* ------------------------------------------------------------------- */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Подключение к БД */
mongoose
    .connect(MONGO_SERVER)
    .then(() => {
    console.log(`Mongoose started ${MONGO_SERVER}`);
})
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
/* Запуск приложения */
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
