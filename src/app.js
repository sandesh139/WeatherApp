const express = require('express')

const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

//define paths for Express
const app = express()
const publiDirecyoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handle bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publiDirecyoryPath))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather Nice App',
        name: 'Sandesh Timilsina'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Sandesh Timilsina'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/about/*', (req,res)=>{
    res.send('Help Not found')
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name:'Sandesh Timilsina',
        errorMessage: 'Sorry, the page is not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})