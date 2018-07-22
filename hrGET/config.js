var dotEnv = require('dotenv').config();

module.exports = {
  hostName: process.env.hostName,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret
}
