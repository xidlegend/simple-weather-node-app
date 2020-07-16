// Require Modules
const chalk = require ('chalk');
const geocode = require('./geocode');
const weatherApi = require('./weatherApi');
const utils = require('./utils');

// Initializers
const init = () => {
    const yBB = (str) => {console.log(chalk.bold.yellowBright(str))};
    yBB('========= APP START ==========\n');
}


// MAIN
const main = async (location, country, limit = 1) => {
    
    let lat, lon;
    let scode = utils.getShortCode(country);

    // Get Coordinates

    await geocode.getCoordinates(location, scode, limit)
        .then (res => {
            [lat, lon] = res;
        })
        .catch (err => {
            if(err.response){
                console.log('getCoordinates: Unable to fetch response');
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            else if(err.request)
                console.log('getCoordinates: Unable to send request');
            else
                console.log(`ERROR: ${err.message}`);
        });
    
    // Get weather url -> data

    const url = weatherApi.getURL(lat, lon, 'metric', 'en');
    weatherApi.getData(url)
        .then (res => {
            // Parse Data
            const data = utils.parseData(res);
            // Display
            utils.displayData(data);
        })    
        .catch(err => {
            if(err.response) {
                console.log('getData: Unable to fetch Data');
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            else if (err.request) {
                console.log('getData: Unable to send request');
            }
            else
                console.log(`Error: ${err.message}`);
    });    
}


init();
main('NIT Kurukshetra', 'India');




// yBB('============ EXIT ============\n');