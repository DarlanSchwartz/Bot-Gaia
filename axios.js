const axios = require('axios');
const TOKEN = "7728375831:AAEAlHQP4JgvSw0dnBSJ3Zseta6NAjTc728";
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const Provider = axios.create({
    baseURL: BASE_URL,
});

module.exports = {
    Provider
};