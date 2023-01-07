// API Key
const apiKey = '922f0ee8e01a77107a8791e91f1be21a';

var cityInput = document.querySelector("#city-input");
var cityName = document.querySelector(".city-name");
var submitBtn = document.querySelector("#submit-btn");
var cityName = document.querySelector(".card-title");
var weatherData = document.querySelector(".card-text");
var weatherHistory = document.querySelector(".li-history")



// When the submit button is clicked the API is called

function formSubmitHandler(event) {
    event.preventDefault();
    
    var location = cityInput.value;
    

    if (location) {
        getApi(location);

        cityInput.textContent = '';

    }

    renderSearchHistory();
    renderCurrentWeather();
}

function renderCurrentWeather() {
    cityName.textContent = cityInput.value;
}

function renderSearchHistory() {
    weatherHistory.textContent = cityInput.value;

}

// Function calls the API information and displays it in the console.
function getApi(location) {

 var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey +  "&units=imperial&cnt=40";
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
       })
             .then(function (data) {
                console.log(data)
                })
             
}

// function getApi(location) {
//     var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey +  "&units=imperial&cnt=40";
        
//     fetch(queryURL)
//      .then(function (response) {
//         if(response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//             console.log(data);
//             displayWeather(data, temp_min , temp_max ,description)
//         });
//     } else {
//         alert('Invalid Entry')
//     }
//     })
            
// }

function displayWeather(data, temp_min , temp_max ,description) {
    console.log(data)
    console.log(temp_min)
    console.log(temp_max)
    console.log(description)

}


// Function gathers user input

function userInfo() {
    
}


// Function displays the searched city's most recent weather information at the top of the page.


// Function displays the 5-day forecast below the most recent weather information.



// Function retains the history of the search at the bottom of the page.

//  getApi()

submitBtn.addEventListener('click' , formSubmitHandler);