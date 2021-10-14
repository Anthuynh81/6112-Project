// index.js
const axios = require('axios');

async function getValue() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    return response.data[0].title;
}

module.exports = getValue;

