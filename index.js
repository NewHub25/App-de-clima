const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

const WEATHER_IMG = [
  { Clear: "./img/clear.png" },
  { Rain: "./img/rain.png" },
  { Snow: "./img/snow.png" },
  { Clouds: "./img/cloud.png" },
  { Haze: "./img/mist.png" },
];

search.addEventListener("click", () => {
  const API_KEY = "dd3fd54dd52fcb0979da7cbd209ce7c6";
  const city = document.querySelector(".search-box input").value;
  if (city === "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        container.getElementsByClassName.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fade-in");

      console.log(json);

      const img = document.querySelector(".weather-box img");
      const temperature = document.querySelector("weather-box .temperature");
      const description = document.querySelector("weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");
      img.src = json ? WEATHER_IMG.find((f) => f[json.weather[0].main]) : "";
    });
});
