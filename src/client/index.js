const axios = require('axios')

function getAuthenticatedHeaders() {
    return {
        'Authorization': `Bearer ${process.env.SECRET_BEARER}`
    }
}

const client = axios.create({
    baseURL: process.env.API_REST_URL,
    headers: {
        ...getAuthenticatedHeaders(),
    }
})

module.exports = client