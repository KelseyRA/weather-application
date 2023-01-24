// API Key
const apiKey = '922f0ee8e01a77107a8791e91f1be21a';
const fiveApiKey = '89dfb57383c9710b060c9cd616c46f68';

var cityInput = document.querySelector("#city-input");
var submitBtn = document.querySelector("#submit-btn");
var cityName = document.querySelector(".card-title");
var weatherData = document.querySelector(".card-text");
var weatherHistory = document.querySelector(".ul-history");


// When the submit button is clicked the API is called, current date is rendered, city name is rendered.

function formSubmitHandler(event) {
    event.preventDefault();

    const location = cityInput.value;

    if (location) {
        getApi(location);
        fiveDay(location);
        cityInput.textContent = '';
    }

    saveHistory();
    renderCityName();
    currentDay();

}

// Renders the searched city name in the current weather card.

function renderCityName() {

    cityName.textContent = cityInput.value;

}

// Generates the current date at the top of the page

function currentDay() {
    var date = dayjs().format('MM/DD/YYYY');

    document.querySelector('.current-weather').textContent = "Current Weather - " + date;


}

// Sets the local storage and displays it at the bottom of the page

function saveHistory() {
    var savedCity = JSON.parse(localStorage.getItem("searchHistory")) || [];
    savedCity.push(cityInput.value)
    console.log(savedCity);
    localStorage.setItem("searchHistory", JSON.stringify(savedCity));
    renderSearchHistory();
}

function renderSearchHistory() {
    var savedCities = JSON.parse(localStorage.getItem("searchHistory")) || [];
    weatherHistory.textContent = "";

    for (var i = savedCities.length - 1; i > savedCities.length - 7; i--) {
        var city = document.createElement('p');
        city.textContent = savedCities[i];
        city.setAttribute("data-value", savedCities[i]);
        city.setAttribute("class", "history-list");
        city.addEventListener('click', historySearch);
        weatherHistory.appendChild(city);
    }


}

function historySearch() {
    console.log(this.dataset.value);
    getApi(this.dataset.value);
    fiveDay(this.dataset.value);
}

// Function calls the current weather and displays it at the top of the page.
function getApi(location) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            data = response.json();
            return data;
        })
        .then(function (data) {
            console.log(data)


            var temp = data.main.temp;
            var description = data.weather[0].description;
            var icon = data.weather[0].icon;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;

            document.querySelector('.temp').innerHTML = "<strong>Temp: </strong>" + (Math.floor(temp)) + " °F";
            document.querySelector('.description').innerHTML = "<strong>Cloud Coverage: </strong>" + description;
            document.querySelector('.humidity').innerHTML = "<strong>Humidity: </strong>" + humidity + " %";
            document.querySelector('.wind').innerHTML = "<strong>Wind: </strong>" + wind + " MPH";


            const iconImage = document.createElement("img");
            iconImage.src = "https://openweathermap.org/img/w/" + icon + ".png";
            var iconEl = document.querySelector(".icon");
            iconEl.textContent = "";
            iconEl.appendChild(iconImage);



        })

}

// Function displays the 5-day forecast below the most recent weather information.

function fiveDay(location) {

    var fiveDayQ = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + "&units=Imperial&cnt=40&APPID=" + fiveApiKey;


    fetch(fiveDayQ)
        .then(function (response) {
            data = response.json();
            return data;
        })
        .then(function (data) {
            console.log(data)


            var dayOneEl = document.querySelector(".dayOne");
            dayOneEl.textContent = "";


            for (var i = 0; i < data.list.length; i = i + 8) {
                console.log(data.list[i].dt_txt);

                var card = document.createElement("div");
                var cardOuterDiv = document.createElement("div");
                var cardBody = document.createElement("div");
                var dateEl = document.createElement("h5");
                var tempOne = document.createElement("p");
                var humidityOne = document.createElement("p");
                var windOne = document.createElement("p");
                var iconOne = document.createElement("p");

                card.setAttribute("class", "col text-center");
                cardOuterDiv.setAttribute("class", "card h-100 five-day");
                cardBody.setAttribute("class", "card-body");
                dateEl.setAttribute("class", "card-title");
                humidityOne.setAttribute("class", "card-text");
                windOne.setAttribute("class", "card-text");
                iconOne.setAttribute("class", "card-text");
                tempOne.setAttribute("class", "card-text");

                dateEl.innerHTML = "<strong>Date: </strong>" + data.list[i].dt_txt;
                tempOne.innerHTML = "<strong>Temp: </strong>" + (Math.floor(data.list[i].main.temp)) + " °F";
                humidityOne.innerHTML = "<strong>Humidity: </strong>" + data.list[i].main.humidity + " %";
                windOne.innerHTML = "<strong>Wind: </strong>" + data.list[i].wind.speed + " MPH";

                const fiveImage = document.createElement("img");
                fiveImage.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                var fiveEl = document.querySelector(".icon");
                fiveEl.textContent = "";
                fiveEl.appendChild(fiveImage);


                dayOneEl.appendChild(card);
                card.appendChild(cardOuterDiv);
                cardOuterDiv.appendChild(cardBody);
                cardBody.appendChild(dateEl);
                dateEl.append(tempOne);
                tempOne.append(humidityOne);
                humidityOne.append(windOne);
                windOne.append(fiveImage);

            }
        })
}

// Weather information is called when the 'submit' button is clicked

submitBtn.addEventListener('click', formSubmitHandler);
renderSearchHistory();

