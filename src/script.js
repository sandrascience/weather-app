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

let element = document.querySelector("#current-date");
element.innerHTML = getCurrentDate(today);

function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = ` ${Math.round(
    response.data.main.temp
  )} <sup>ºC</sup>`;

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocationWeather);

search("lisbon");
