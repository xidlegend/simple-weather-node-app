const fs = require('fs');
const chalk = require('chalk');

const getShortCode = country => {
    const list = JSON.parse(fs.readFileSync('./countryShortCode.json').toString());
    const shortCode = list[country.toLowerCase()];

    // Return If shortCode
    if(shortCode) return shortCode;
        else {
            console.error('Country Not Found');
            console.log(list);
        }
}

const parseData = (res) => {
    return {
        place:res.data.name,
        country:res.data.sys.country,
        description: res.data.weather[0].description, 
        temp: res.data.main.temp, 
        humidity: res.data.main.humidity, 
        feels_like: res.data.main.feels_like, 
        rain: `${res.data.rain ? Math.round(res.data.rain["1h"]*100) : '0'}`
    };
};

const displayData = (data) => {
    console.log(chalk.bold`\n\n====== WEATHER REPORT ======\n`);
    console.log(chalk.bold(`Currently outside in ${data.place}, ${data.country}: ${data.description}`));
    console.log(`\tTemprature:\t${chalk.green(data.temp)} °C`);
    console.log(`\tHumidity:\t${chalk.magenta(data.humidity)} %`);
    console.log(`\tFeels Like:\t${chalk.red(data.feels_like)} °C`);
    console.log(`${chalk.bold`Rain in the next hour: `}${chalk.blue(data.rain)} cm`);
};

module.exports = {
    getShortCode, 
    displayData, 
    parseData
}
