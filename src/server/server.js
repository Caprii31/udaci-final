var path = require('path')
const fetch = require('node-fetch')

//set env-variables
const dotenv = require('dotenv')
dotenv.config();


const PORT = 3000

//require express ==> create instance  
const express = require('express');
const app = express();


//cors
const cors = require('cors');
app.use(cors());

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express static directory.
app.use(express.static('dist'));

// ===> port
app.listen(PORT, function () {
    console.log('Example app listening on port 3000!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  
})

//main variables

//weatherbit cred.....
const weatherbitBaseURl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbitURlII = '&include=minutely'
const weatherbitKey = process.env.weatherbit_KEY

//geoNames ...
const geonamesKey = process.env.geonames_KEY
const geonamesBaseURL = 'http://api.geonames.org/searchJSON?q='
const geoURLII = '&maxRows=10&username='

//pixabay ...
const pixaURL = 'https://pixabay.com/api/?key='
const pixaKey = process.env.pixabay_KEY
const pixaURLII = '&image_type=photo'

app.post('/userData', async(req, res)=>{
    let fullData={};
    const geonamesData = await fetch(geonamesBaseURL+req.body.location+geoURLII+geonamesKey)
    .then(async(data)=>{
        const cordinates = await data.json();
        return cordinates
    })
    .then(dataII=>{
        fullData.lat=dataII.geonames[0].lat
        fullData.lng=dataII.geonames[0].lng
        
    })
    .catch(e=>{
        console.log('error',e)
    })
    

    const weatherbitData = await fetch(`${weatherbitBaseURl}&lon=${fullData.lng}&lat=${fullData.lat}&key=${weatherbitKey}`)
    .then(async (res)=>{
         const weatherInfo = await res.json();
        return weatherInfo
    })
    .then(resII=>{
        let neededArr = ''
        const startDateVal = req.body.value
        const date1 = new Date(startDateVal)
        const date2 = new Date()
    
        const dateDiff = Math.abs(date1.getDate()-date2.getDate())
        if(dateDiff > date2.getDay()+1){
            neededArr = dateDiff
        }else {
            neededArr = 0
        }
        fullData.tempreture=resII.data[neededArr].temp
        fullData.maxTemp = resII.data[neededArr].max_temp
        fullData.minTemp = resII.data[neededArr].min_temp
        fullData.location = req.body.location
    })
    .catch(e=>{
        console.log('error',e)
    })

    const pixaData = await fetch(pixaURL+pixaKey+'&q='+fullData.location+pixaURLII)
    .then(async (resIII)=>{
        const pixa = await resIII.json()
        return pixa
    })
    .then(respond=>{
        fullData.photoURL = respond.hits[0].largeImageURL
        fullData.photoURL1 = respond.hits[1].largeImageURL
        fullData.photoURL2 = respond.hits[2].largeImageURL
        fullData.photoURL3 = respond.hits[3].largeImageURL
        res.send(fullData)
    })
    .catch(e=>{
        console.log('error',e)
        })
 })






