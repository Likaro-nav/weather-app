const express = require ('express') ;
const bodyParser = require('body-parser');
const  request  =  require ( 'request' ) ;
const app = express () ;


let  apiKey  =  '681c6a364dfce53923f1aa23c2dec38d';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get ('/', function (req, res) { 
  res.render('index', {weather: null, error: null});
});


app.post("/", function(req, res){
  let  city  = req.body.city;
  let  url  =  `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } 
    else {
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
      let message = `¡Hace ${weather.main.temp} grados en ${weather.name}!`;
      res.render('index', {weather: message, error: null});
      console.log(message);
      }
    }
  });

});

app.listen (3000, function ( ) { 
  console.log ('¡Aplicación de ejemplo escuchando en el puerto 3000!') 
})