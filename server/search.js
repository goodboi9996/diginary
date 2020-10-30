const axios = require('axios');
const { SEARCH_URL, KEY, CX } = require('./config.json');

async function search(query) {
    const response = await axios.get(`${SEARCH_URL}?key=${KEY}&cx=${CX}&q=${query}`);
    return response;
}

exports.search = search;
