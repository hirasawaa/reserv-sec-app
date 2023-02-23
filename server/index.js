const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/dev')
const FakeDb = require('./fake-db')
const productRoutes = require('./routes/products')

mongoose.set('strictQuery', false)

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        const fakeDb = new FakeDb()
        fakeDb.initDb()
    }
)

// app.get('/products', function (req, res) {
//     res.json({ 'success': true })
// })

app.use('/api/v1/products', productRoutes)


const PORT = process.env.PORT || '3001'
app.listen(PORT, function () {
    console.log('I am running!')
})

