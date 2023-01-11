// API Key
const apiKey = '922f0ee8e01a77107a8791e91f1be21a';
const fiveApiKey = '89dfb57383c9710b060c9cd616c46f68';

var cityInput = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var cityName = document.querySelector(".card-title");
var weatherData = document.querySelector(".card-text");
var weatherHistory = document.querySelector(".ul-history");



weatherHistory.innerHTML = localStorage.getItem('searchHistory');

// When the submit button is clicked the API is called

function formSubmitHandler(event) {
    event.preventDefault();
    
    const location = cityInput.value;

    if (location) {
        getApi(location);
        fiveDay(location);
        cityInput.textContent = '';

    }

    renderSearchHistory();
    renderCurrentWeather();
    currentDay();
    
}

function renderCurrentWeather() {
    cityName.textContent = cityInput.value;
    
}

function currentDay() {
    var date = dayjs().format('MM/DD/YYYY');
    
    console.log(date);

    document.querySelector('.current-weather').textContent= "Current Weather - " + date;


}

function renderSearchHistory() {

    localStorage.setItem("searchHistory" , cityInput.value)

    weatherHistory.innerHTML = localStorage.getItem('searchHistory');

}

// Function calls the API information and displays it in the console.
function getApi(location) {

 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey +  "&units=imperial";
    
    fetch(queryURL)
        .then(function (response) {
            data=response.json();
            return data;
       })
        .then(function (data) {
            console.log(data)

 //Displays the searched city's most recent weather information at the top of the page.
           
            var temp = data.main.temp;
            var description = data.weather[0].description;
            var icon = data.weather[0].icon;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;

            // var locationIcon = document.querySelector('.icon');
            


            console.log(Math.floor(temp)); 
            console.log(description); 
            console.log(humidity);
            console.log(wind);
            console.log(icon);

            document.querySelector('.temp').textContent= "Temp: " + (Math.floor(temp)) + " °F";
            document.querySelector('.description').textContent= "Cloud Coverage: " + description;
            document.querySelector('.humidity').textContent= "Humidity: " + humidity + " %";
            document.querySelector('.wind').textContent= "Wind: " + wind + " MPH";
            

            const iconImage = document.createElement("img");
            iconImage.src = "https://openweathermap.org/img/w/" + icon + ".png";
            document.querySelector(".icon").appendChild(iconImage);
           
        })

        

       
}

// Function displays the 5-day forecast below the most recent weather information.

function fiveDay(location) {

    var fiveDayQ = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + "&units=Imperial&cnt=40&APPID=" + fiveApiKey;


    fetch(fiveDayQ)
        .then(function (response) {
            data=response.json();
            return data;
       })
        .then(function (data) {
            console.log(data)
           
            // var tempOne = data.list[8].main.temp;
            // // var descriptionOne = data.list[8].weather[0].description;
            // var iconOne = data.list[8].weather[0].icon;
            // var humidityOne = data.list[8].main.humidity;
            // var windOne = data.list[8].wind.speed;

            // const hidden = document.getElementsByClassName('.five-day');

            

            // document.querySelector('.tempOne').textContent= "Temp: " + (Math.floor(tempOne)) + " °F";
            // // document.querySelector('.description').textContent= "Cloud Coverage: " + descriptionOne;
            // document.querySelector('.humidityOne').textContent= "Humidity: " + humidityOne + " %";
            // document.querySelector('.windOne').textContent= "Wind: " + windOne + " MPH";
            // document.querySelector('.iconOne').textContent= iconOne;

            // hidden.classList.remove('.hidden');

            // for (var i = 0; i < data.list.length; i++) {
            //     console.log(data.list[i].dt_txt);
            // }
        })
}



// Function retains the history of the search at the bottom of the page.

submitBtn.addEventListener('click' , formSubmitHandler);

// Notes - Do I need to have the city save in local storage first and the have it display in history and current weather?
