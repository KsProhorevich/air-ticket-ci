const express = require('express');
const calculateTicketPrice = require('./src/ticketCalculator');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;

const loyaltyDB = {
    'AB123456': 'gold',
    'CD654321': 'silver',
    'EF111222': 'platinum',
    'ZZ999999': 'none'
};

app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: 'online',
        timestamp: new Date()
    });
});

app.get('/api/loyalty/:passport', (req, res) => {
    const passport = req.params.passport;

    if (!loyaltyDB[passport]) {
        return res.status(404).json({
            status: 'error',
            message: 'Пассажир не найден'
        });
    }

    res.status(200).json({
        passport,
        loyaltyLevel: loyaltyDB[passport]
    });
});

app.post('/api/tickets/calculate', (req, res) => {
    try {
        const { passport, basePrice, baggageWeight, serviceClass } = req.body;

        if (!passport || !loyaltyDB.hasOwnProperty(passport)) {
            return res.status(400).json({
                status: 'error',
                message: 'Неверный номер паспорта'
            });
        }

        const loyaltyLevel = loyaltyDB[passport];

        const result = calculateTicketPrice(
            Number(basePrice),
            Number(baggageWeight),
            serviceClass,
            loyaltyLevel
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;