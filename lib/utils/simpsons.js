const { default: axios } = require('axios');

const getSimpsonsStuff = async () => {
    const { data } = await axios.get('https://thesimpsonsquoteapi.glitch.me/quotes');

    return data[0];
}

module.exports = getSimpsonsStuff;