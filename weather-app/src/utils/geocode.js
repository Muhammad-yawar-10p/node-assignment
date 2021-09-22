const request = require('request')

const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWF3YXI4NSIsImEiOiJja3RteWNkaTQwZzkyMm9yMHNjNzVhM3M4In0.teU8QO9b_eIlpXZ29O2dFw&limit=1'
  request({ 'url': url, 'json': true }, (error, { body })=>{
    if(error) {

      callback('Unable to find', undefined)
    } else if (body.features.length === 0) {

      callback('No features available', undefined)
    } else {

      const data = {
        'latitude': body.features[0].center[0],
        'longtitude': body.features[0].center[1],
        'location': body.features[0].place_name,
      }
      callback(undefined, data)
    }
  })
}
module.exports = geocode