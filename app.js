const express = require('express')
const app = express()

const path = require('path')
const fs = require('fs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const session = require('express-session')
app.use(session({
    secret:'yxx',
    resave:false,
    saveUninitialized:false
}))

app.use(express.static('./views'))
app.use('/node_modules', express.static('./node_modules'))

app.set('view engine', 'ejs')
app.set('views', './views')

fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) throw err
    filename.forEach(value => {
        const router = require(path.join(__dirname, './router', value))
        app.use(router)
    })
})

app.listen(80, () => {
    console.log('http://127.0.0.1');
})