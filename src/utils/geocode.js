const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVvbmlmZWxoZWltIiwiYSI6ImNrM3pjZnEwYjAybXozZW10azk2dTFxY2IifQ.M3qMl_6O3em2fnprY0YpYQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const data = {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode