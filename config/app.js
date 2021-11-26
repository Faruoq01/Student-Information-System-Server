require('dotenv').config()

module.exports = {
    databaseURL: process.env.MONGO_URI,
    appPort: process.env.APP_PORT
}