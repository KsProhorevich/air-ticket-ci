const calculateTicketPrice = require('../src/ticketCalculator');

describe('Функция расчета авиабилета', () => {

    describe('Позитивные сценарии', () => {

        test('Эконом без перевеса', () => {
            const result = calculateTicketPrice(200, 15, 'economy', 'none');

            expect(result).toEqual({
                status: 'success',
                loyaltyLevel: 'none',
                finalPrice: 200
            });
        });

        test('Эконом с перевесом', () => {
            const result = calculateTicketPrice(200, 25, 'economy', 'none');
            expect(result.finalPrice).toBe(450);
        });

        test('Бизнес класс применяет коэффициент', () => {
            const result = calculateTicketPrice(200, 20, 'business', 'none');
            expect(result.finalPrice).toBe(360);
        });

        test('Gold loyalty дает скидку', () => {
            const result = calculateTicketPrice(200, 20, 'economy', 'gold');
            expect(result.finalPrice).toBe(180);
        });

        test('Platinum loyalty дает максимальную скидку', () => {
            const result = calculateTicketPrice(200, 20, 'economy', 'platinum');
            expect(result.finalPrice).toBe(170);
        });

    });

    describe('Негативные сценарии', () => {

        test('Ошибка при слишком низком тарифе', () => {
            expect(() => calculateTicketPrice(50, 10, 'economy'))
                .toThrow('Базовая стоимость ниже минимального тарифа');
        });

        test('Ошибка при отрицательном багаже', () => {
            expect(() => calculateTicketPrice(200, -5, 'economy'))
                .toThrow('Вес багажа не может быть отрицательным');
        });

        test('Ошибка при неверном классе', () => {
            expect(() => calculateTicketPrice(200, 10, 'vip'))
                .toThrow('Некорректный класс обслуживания');
        });

    });

});