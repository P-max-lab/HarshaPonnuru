// script.js

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
    cityInput.value = '';
  }
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      displayWeatherData(data);
    } else {
      weatherInfo.textContent = 'Error fetching weather data.';
    }
  } catch (error) {
    console.error(error);
    weatherInfo.textContent = 'An error occurred.';
  }
}

function displayWeatherData(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp - 273.15);
  const weatherDescription = data.weather[0].description;

  weatherInfo.innerHTML = `
    <h2>${cityName}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Weather: ${weatherDescription}</p>
  `;
}
