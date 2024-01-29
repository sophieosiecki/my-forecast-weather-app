function updateForecast(response) {
  let forecastDay = document.querySelector("#weather-forecast");
  forecastDay.innerHTML = "";
  console.log(response);

  for (let i = 1; i < 5; i++) {
    function formattedDayOfWeek(day) {
      let dayMultiplied = day * 1000;
      let date = new Date(dayMultiplied);
      let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let forecastDay = daysOfWeek[date.getDay()];
      return forecastDay;
    }
    function formattedDate(day) {
      let dayMultiplied = day * 1000;
      let date = new Date(dayMultiplied);
      let forecastDate = date.getDate();
      return forecastDate;
    }

    function formattedMonth(day) {
      let dayMultiplied = day * 1000;
      let date = new Date(dayMultiplied);
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let forecastMonth = months[date.getMonth()];

      return forecastMonth;
    }
    forecastDay.innerHTML += `<div class="day">
    <h3>${formattedDayOfWeek(response.data.daily[i].time)}
      ${formattedDate(response.data.daily[i].time)}
      ${formattedMonth(response.data.daily[i].time)}</h3>
    <img src="${response.data.daily[i].condition.icon_url}" />

    <div class="forecast-max"><span class="forecast-max-temp">${Math.round(
      response.data.daily[i].temperature.maximum
    )}</span><span class="forecast-max-units">˚C</span></div>
    <div class="forecast-min"><span class="forecast-min-temp">${Math.round(
      response.data.daily[i].temperature.minimum
    )}</span><span class="forecast-min-units">˚C</span></div>`;
  }
}

function forecast(response) {
  let forecastDay = document.querySelector("#weather-forecast");
  let query = response.data.city;
  let key = "044f639212f8b63toca06640b723a6aa";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${key}&units=metric`;
  axios.get(apiUrlForecast).then(updateForecast);
}

function updateData(response) {
  function displayCity(response) {
    let city = response.data.city;
    let country = response.data.country;
    let cityElement = document.querySelector("#city");
    let countryElement = document.querySelector("#country");

    if (!city) {
      alert("Check your input for typos!");
    } else {
      cityElement.innerHTML = city;
      countryElement.innerHTML = country.toUpperCase();
    }
  }

  function updateCurrentWeather(response) {
    let currentTemperatureElement = document.querySelector("#current-temp");
    let currentTemperature = Math.round(response.data.temperature.current);
    currentTemperatureElement.innerHTML = currentTemperature;
    let descriptionElement = document.querySelector("#current-description");
    let description = response.data.condition.description;
    descriptionElement.innerHTML = description;
    let iconUrl = response.data.condition.icon_url;
    let iconElement = document.querySelector("#current-weather-icon");
    iconElement.innerHTML = `<img src ="${iconUrl}" />`;
  }
  displayCity(response);
  updateCurrentWeather(response);
  forecast(response);
}

function getWeatherData(cityValue) {
  let apiKey = "044f639212f8b63toca06640b723a6aa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateData);
}

function handleSearchInput(event) {
  event.preventDefault();

  let cityElementInput = document.querySelector("#city-input");
  let cityValue = cityElementInput.value;
  getWeatherData(cityValue);
}

let searchInputElement = document.querySelector("#city-search");

getWeatherData("LA");
searchInputElement.addEventListener("submit", handleSearchInput);
