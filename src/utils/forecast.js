const request = require('request')
const forecast= (latitude, longitude, callback)=>{
    console.log(latitude,longitude)
    const url = 'http://api.weatherstack.com/current?access_key=1f54029290d2074bb5cb6eb4333dbaa9&query='+latitude+','+longitude
    request({url: url,json: true}, (error,response) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        }else {
            tempInFahrenheit = (response.body.current.temperature * 9/5) +32
            feelslike = (response.body.current.feelslike * 9/5) +32
            callback(undefined, response.body.current.weather_descriptions[0]+'. It is currently ' +tempInFahrenheit+ ' degrees out. Feels like ' +
            feelslike +' degrees. There is a '+ response.body.current.precip + '% chance of rain. '+
            'The current local time is '+ response.body.location.localtime)
        }
    })
}
module.exports = forecast