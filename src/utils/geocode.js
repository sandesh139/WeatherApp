const request = require("request")

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address+'.json?access_token=pk.eyJ1Ijoic2FuZGVzaDEzOSIsImEiOiJja2oxd3dicnMxczc4MndtbzZ6NnU2NTViIn0.GtXjcKn4KDeiZbjlYqI95g&limit=1'
    request({url: url, json: true},(error,response) => {
        if(error){
            callback('Unable to connect to location',undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
