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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat","Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
  <div class = "col-2">    
          <div class="forecast-day"><strong>${day}</strong></div>
          <div class="forecast-temperatura">16ºC</div>
          <div class="forecat-icon"><i class="fa-solid fa-cloud"></i></div>
  </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

displayForecast();

search("lisbon");