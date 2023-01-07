var city = document.querySelector("#input");
var submitBtn = document.querySelector("form");
var cityName = document.querySelector(".card-title");
var weatherData = document.querySelector(".card-text");

// API Key
const apiKey = '922f0ee8e01a77107a8791e91f1be21a';

// var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey +  "&units=imperial&cnt=40";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=philadelphia&appid=" + apiKey + "&units=imperial&cnt=40";


submitBtn.addEventListener('click' , function(event) {
    event.preventDefault()
})

function getApi() {

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
             console.log(data)
             })
}

getApi()