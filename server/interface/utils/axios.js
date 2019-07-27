const axios = require('axios')

const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}: 
    ${process.env.PROT || 3000}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

module.exports = instance
