const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = "6253821d856877479c1a5f425af3ed30";

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.render('index')
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } 
      else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } 
        else {
          let weatherText = `It's ${weather.main.temp}°F in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
})

app.listen(3000, () => {
    console.log("Server started");
})