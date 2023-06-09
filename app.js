const express = require ('express')
const https = require("https")
//install package to get use input - body parser
const bodyParser = require("body-parser")
const app = express()


app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function (req,res){

    res.sendFile(__dirname + "/index.html")   
})

app.post("/", function(req,res){
  
    const query = req.body.cityName // Name of input in HTML
    const apiKey = "7a8fb47ff40cd23384da3446c5066c54"
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit 

    https.get(url, function(response){
        console.log(response)

        response.on("data", function(data){
          // parse data into JS object
         const weatherData =  JSON.parse(data)
         const temp = weatherData.main.temp
         const weatherDescription = weatherData.weather[0].description
        // send response to clients browser
        res.write(`The weather is currently ${weatherDescription}. `)
        res.write(`The temperature in ${query} is ${temp} degress Fahrenheit`)
        res.send()
        })
    }) // get method needs a url 


} )

app.listen(4000, function () {
    console.log(`server is running on port 3000`)
})