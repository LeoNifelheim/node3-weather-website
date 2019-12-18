const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Leo Nifelheim'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Leo Nifelheim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Some helpful messages.',
        name: 'Leo Nifelheim'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, dataForecast) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    dataForecast,
                    location,
                    address
                })
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        msg: 'Help article not found.',
        name: 'Leo Nifelheim'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found.',
        name: 'Leo Nifelheim'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})