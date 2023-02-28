const container = document.querySelector(".container");
const SEARCH_BUTTON = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const INPUT = document.querySelector(".search-box input");

const WEATHER_IMAGES = [
  { Clear: "./img/clear.png" },
  { Rain: "./img/rain.png" },
  { Snow: "./img/snow.png" },
  { Clouds: "./img/cloud.png" },
  { Haze: "./img/mist.png" },
  { Fog: "./img/mist.png" },
  { Mist: "./img/mist.png" },
];

SEARCH_BUTTON.addEventListener("click", () => {
  const API_KEY = "dd3fd54dd52fcb0979da7cbd209ce7c6";
  const city = INPUT.value;
  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }
      error404.style.display = "none";
      error404.classList.remove("fade-in");

      console.log(json);

      const weather_IMG = document.querySelector(".weather-box img");
      const description_P = document.querySelector(".weather-box .description");
      const temperature_P = document.querySelector(".weather-box .temperature");
      const humidity_SPAN = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      const MAIN = json?.weather?.[0].main;
      if (!MAIN) return;
      weather_IMG.src = WEATHER_IMAGES.find((f) => f[MAIN])[MAIN] ?? "";
      description_P.innerHTML = `${json.weather[0].description} in <b>${
        json.name
      }<b>, <i>${COUNTRY_CODES.find((f) => f[1] === json.sys.country)[0]}</i>`;
      temperature_P.innerHTML = `${(json.main.temp - 273.15).toFixed(
        0
      )}<span>ºC</span>`;
      humidity_SPAN.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed} Km/h`;

      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "600px";
    });
});

/**
 * Snow
 * Few Clouds
 * Broken Clouds
 * Scattered Clouds
 * Clear Sky
 * Overcast Clouds
 * Mist
 * Moderate Rain
 */

function keyEnter(e) {
  if (e.code === "Enter") {
    SEARCH_BUTTON.click();
  }
}
INPUT.addEventListener("keydown", keyEnter);
