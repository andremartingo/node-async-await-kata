const axios = require("axios");
const API_EXCHANGE = "http://api.fixer.io/latest?base=";
const API_COUNTRIES = "http://restcountries.eu/rest/v2/currency/";

const argv = require("./config");

/**
 * Get Exchange Rate from an api
 * @param {Initial Currency } from 
 * @param {Final Currency} to 
 */
const getExchangeRate = async (from, to) => {
    try{
        const response = await axios.get(`${API_EXCHANGE}${from}`);
        const rate =  response.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error();
        }
    }catch(e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
}

/**
 * Get Countries which use some currency code
 * @param {Currecy code like "USD","EUR"} currencyCode 
 */
const getCountries = async (currencyCode) => {
    try{
        const response = await axios.get(`${API_COUNTRIES}${currencyCode}`);
        return response.data.map((country)=>country.name);
    }catch(e){
        throw new Error(`Unable to get Countries that use ${currencyCode}`);
    }
}

/**
 * Convert currency and get countries which is valid to spend 
 * @param {Inital Currency} from 
 * @param {Final Currency} to 
 * @param {Currency Amount} amount 
 */
const convertCurrency = async (from, to, amount) => {
    try {
        let countries = await getCountries(to);
        const rate = await getExchangeRate(from, to);
        const exchangeAmount = amount * rate;
        return `${amount} ${from} is worth ${Number((exchangeAmount).toFixed(1))} ${to}. ${to} can be used in the following countries: ${countries.join(", ")}`
    } catch (e) {
        return e;
    }

}

convertCurrency(argv.initialcurrency, argv.finalcurrency, argv.amount).then((res) => {
    console.log(res);
}).catch(e => console.log(e));