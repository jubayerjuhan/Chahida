const mongoose = require('mongoose')

const connectDatabase = async () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Database Connected to ${data.connection.host}`)
  })

}

module.exports = connectDatabase