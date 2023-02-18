

const mongoose = require('mongoose')
//"mongodb://hithaaaa:1234@cluster0.mu4hxuw.mongodb.net/?retryWrites=true&w=majority"
//mongodb://localhost:27017/iot
//mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority
//final - mongodb+srv://hithaaaa:1234@cluster0.mu4hxuw.mongodb.net/iot?retryWrites=true&w=majority
mongoose
    .connect("mongodb://localhost:27017/iot", { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db_cnn = mongoose.connection

module.exports = db_cnn