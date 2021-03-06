const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryFolder))

app.get('', (req, res) => {

  res.render('index', {

    'title': 'Weather',
    'name': 'M Yawar'
  })

})
app.get('/about', (req, res) => {

  res.render('about', {
    'title': 'About me',
    'name': 'M Yawar'
  })
})
app.get('/help', (req, res) => {

  res.render('help', {
    'helpText': 'This is help page',
    'title': 'Help',
    'name':'M Yawar'
  })
})
app.get('/weather', (req, res) => {

  if(!req.query.address) {

    return res.send({
      'error':'You must provide an address.'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

    if(error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {

      if(error) {

        return res.send({ error })
      }
      res.send({

        'forecast': forecastData,
        location,
        'address': req.query.address
      })

    })
  })

})
app.get('/help/*', (req, res) => {

  res.render('404', {
    'title': '404',
    'name':'M Yawar',
    'errorMessage': 'Help article not found.'
  })
})
app.get('*', (req, res) => {

  res.render('404', {
    'title': '404',
    'name':'M Yawar',
    'errorMessage': 'Page not found.'
  })
})
app.listen(port, ()=> {

  console.log('Server is up and running at port ', port)
})

