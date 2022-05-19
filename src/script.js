let today = new Date();

function getCurrentDate(dateInput) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December"
  ];

  let date = dateInput.getDate();
  let day = days[dateInput.getDay()];
  let month = months[dateInput.getMonth()];
  let hours = dateInput.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuts = dateInput.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let liveDate = `${day}, ${month} ${date}, ${hours}:${minuts}`;
  return liveDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[day];

  
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){

    forecastHTML =
      forecastHTML +
      `  
  <div class = "col-2">    
          <div class="forecast-day"><strong>${formatDay(forecastDay.dt)}</strong></div>
          <span class="forecast-temperature-max"><strong>${Math.round(forecastDay.temp.max)}º</strong></span>
          <span class="forecast-temperature-min">${Math.round(forecastDay.temp.min)}º</span>
          <div class="forecast-icon">
          <img src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt"" width="50" height="50"/>
          </div>
          
  </div>
      `;}
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6cc08a8adb2ba35d34299b6d46a01c22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let element = document.querySelector("#current-date");
element.innerHTML = getCurrentDate(today);

function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#max").innerHTML = `Max <strong>${Math.round(
    response.data.main.temp_max
  )}ºC</strong>`;

  document.querySelector("#min").innerHTML = ` Min <strong>${Math.round(
    response.data.main.temp_min
  )} ºC </strong>`;

  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].main);

  celsiusTemp = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}


function search(city) {
  let apiKey = "6cc08a8adb2ba35d34299b6d46a01c22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "6cc08a8adb2ba35d34299b6d46a01c22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = (celsiusTemp * 1.8) + 32;
  temperatureElement.innerHTML = Math.round(tempFahrenheit); 
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = celsiusTemp;

}

let celsiusTemp = null;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocationWeather);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("lisbon");