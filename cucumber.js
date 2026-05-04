module.exports = {
    default: {
        require: ['steps/**/*.js'],
        paths: ['features/**/*.feature'],
        format: ['summary', 'allure-cucumberjs/reporter'],
        formatOptions: {
            resultsDir: 'allure-results/cucumber',
        },
    },
};