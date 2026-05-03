Feature: API тестирование сервиса продажи авиабилетов

Scenario: Проверка доступности сервиса
  Given сервис доступен по адресу "/api/status"
  Then API возвращает статус-код 200

Scenario: Получение уровня лояльности клиента
  Given клиент запрашивает лояльность по паспорту "AB123456"
  Then API возвращает статус-код 200
  And уровень лояльности равен "gold"

Scenario Outline: Расчет стоимости билета для разных сценариев
  Given паспорт клиента "<passport>"
  And базовая стоимость "<basePrice>"
  And вес багажа "<baggageWeight>"
  And класс обслуживания "<serviceClass>"
  When я отправляю POST запрос на "/api/tickets/calculate"
  Then API возвращает статус-код "<statusCode>"
  And итог содержит "<expectedResult>"

Examples:
  | passport | basePrice | baggageWeight | serviceClass | statusCode | expectedResult |
  | EF111222 | 200 | 20 | economy | 200 | 170 |
  | AB123456 | 200 | 20 | economy | 200 | 180 |
  | AB123456 | 200 | 25 | economy | 200 | 405 |
  | CD654321 | 200 | 20 | business | 200 | 342 |
  | WRONG999 | 200 | 20 | economy | 400 | Неверный номер паспорта |
  | AB123456 | -5 | 20 | economy | 400 | Базовая стоимость ниже минимального тарифа |
  | AB123456 | 200 | -5 | economy | 400 | Вес багажа не может быть отрицательным |