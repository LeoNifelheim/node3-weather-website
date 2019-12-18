const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const lang = 'en'
    const units = 'si'

    const url = 'https://api.darksky.net/forecast/4e6a4eeba8ca6d91188245f7b29282fd/' + latitude + ',' + longitude + '?units=' + units + '&lang=' + lang

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.currently
            const str = body.daily.data[0].summary + ' It is currently ' + data.temperature + ' degrees out. There is a ' + data.precipProbability + '% chance of rain.'
            str = str + ' With: ' + body.daily.data[0].windSpeed + ' wind speed'
            callback(undefined, str)
        }
    })
}

module.exports = forecast