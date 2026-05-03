const request = require('supertest');
const { Given, When, Then } = require('@cucumber/cucumber');
const app = require('../server');

let response;
let requestBody = {};

Given('сервис доступен по адресу {string}', async function (endpoint) {
    response = await request(app).get(endpoint);
});

Given('клиент запрашивает лояльность по паспорту {string}', async function (passport) {
    response = await request(app).get(`/api/loyalty/${passport}`);
});

Then('уровень лояльности равен {string}', function (expectedLevel) {
    if (response.body.loyaltyLevel !== expectedLevel) {
        throw new Error(`Ожидался уровень ${expectedLevel}, получен ${response.body.loyaltyLevel}`);
    }
});

Given('паспорт клиента {string}', function (passport) {
    requestBody.passport = passport;
});

Given('базовая стоимость {string}', function (basePrice) {
    requestBody.basePrice = Number(basePrice);
});

Given('вес багажа {string}', function (baggageWeight) {
    requestBody.baggageWeight = Number(baggageWeight);
});

Given('класс обслуживания {string}', function (serviceClass) {
    requestBody.serviceClass = serviceClass;
});

When('я отправляю POST запрос на {string}', async function (endpoint) {
    response = await request(app)
        .post(endpoint)
        .send(requestBody);
});

Then('API возвращает статус-код {string}', function (statusCode) {
    const expected = parseInt(statusCode.replace(/"/g, '').trim());

    if (response.status !== expected) {
        throw new Error(`Ожидался статус ${expected}, получен ${response.status}`);
    }
});

Then('API возвращает статус-код {int}', function (statusCode) {
    if (response.status !== statusCode) {
        throw new Error(`Ожидался статус ${statusCode}, получен ${response.status}`);
    }
});

Then('итог содержит {string}', function (expectedResult) {
    const responseText = JSON.stringify(response.body);

    if (!responseText.includes(expectedResult)) {
        throw new Error(`Ответ не содержит ${expectedResult}. Получено: ${responseText}`);
    }

    requestBody = {};
});