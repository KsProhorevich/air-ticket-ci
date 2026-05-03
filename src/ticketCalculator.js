function calculateTicketPrice(basePrice, baggageWeight, serviceClass, loyaltyLevel = 'none') {
    const MIN_BASE_PRICE = 100;
    const EXTRA_BAGGAGE_FEE = 50;
    const BUSINESS_COEFFICIENT = 1.8;

    if (basePrice < MIN_BASE_PRICE) {
        throw new Error('Базовая стоимость ниже минимального тарифа');
    }

    if (baggageWeight < 0) {
        throw new Error('Вес багажа не может быть отрицательным');
    }

    if (!['economy', 'business'].includes(serviceClass)) {
        throw new Error('Некорректный класс обслуживания');
    }

    let total = basePrice;

    if (baggageWeight > 20) {
        total += (baggageWeight - 20) * EXTRA_BAGGAGE_FEE;
    }

    if (serviceClass === 'business') {
        total *= BUSINESS_COEFFICIENT;
    }

    const discounts = {
        none: 0,
        silver: 0.05,
        gold: 0.10,
        platinum: 0.15
    };

    total = total - total * discounts[loyaltyLevel];

    return {
        status: 'success',
        loyaltyLevel,
        finalPrice: Number(total.toFixed(2))
    };
}

module.exports = calculateTicketPrice;