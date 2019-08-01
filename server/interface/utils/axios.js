const axios = require('axios')

const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}: 
    ${process.env.PROT || 80}`,
  timeout: 5000,
  headers: {}
})

module.exports = instance
