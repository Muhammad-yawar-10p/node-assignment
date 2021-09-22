const { error } = require('console')
const request = require('request')

const forecast = (lat, lon, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=01b11eb3492a5e0790dbac2711c9d058&query=' + lat + ',' + lon + '&units=f'

  console.log(url)
  request({ 'url': url, 'json': true }, (error, { body })=>{

    if(error) {

      callback('Unable to find', undefined)
    } else if (body.error) {

      callback('No features available', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] +' It is currently ' + body.current.temperature + ' degree out. There is a ' + body.current.precip + ' % chance of rain.' )
    }
  })

}
module.exports = forecast