const API_KEY = 'SUA_API_KEY_AQUI';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const locationElem = document.getElementById('location');
const currentWeatherElem = document.getElementById('current-weather');
const forecastElem = document.getElementById('forecast');

// Obtém a localização do usuário
function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Obtém as informações do clima atual
async function getCurrentWeather(lat, lon) {
    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Obtém as informações da previsão do tempo
async function getForecast(lat, lon) {
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Exibe as informações do clima atual
function displayCurrentWeather(currentWeatherData) {
    const { name, main, weather, wind } = currentWeatherData;
    const icon = weather[0].icon;
    const description = weather[0].description;
    const temp = Math.round(main.temp);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = wind.speed;

    currentWeatherElem.innerHTML = `
    <h3>${name}</h3>
    <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
    <p>Temperatura: ${temp} °C</p>
    <p>Umidade: ${humidity} %</p>
    <p>Pressão: ${pressure} hPa</p>
    <p>Vento: ${windSpeed} km/h</p>
  `;
}

// Exibe as informações da previsão do tempo
function displayForecast(forecastData) {
    let forecastHTML = '';
    forecastData.list.slice(0, 5).forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const time = date.toLocaleTimeString('pt-BR', { hour: 'numeric', hour12: true });
        const icon = forecast.weather[0].icon;
        const description = forecast.weather[0].description;
        const temp = Math.round(forecast.main.temp);
        const humidity = forecast.main.humidity;
        const pressure = forecast.main.pressure;
        const windSpeed = forecast.wind.speed;

        forecastHTML += `
      <div class="forecast-day">
        <h3>${day} ${time}</h3>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
        <p>Temperatura: ${temp} °C</p>
        <p>Umidade: ${humidity} %</p>
        <p>Pressão: ${pressure} hPa</p>
        <p>Vento: ${windSpeed} km/h</p>
      </div>
    `;
    });
    forecastElem.innerHTML = forecastHTML;
}

// Inicia o aplicativo
async function init() {
    try {
        // Obtém a localização do usuário
        const position = await getLocation();
        const { latitude, longitude } = position.coords;    // Obtém as informações do clima atual
        const currentWeatherData = await getCurrentWeather(latitude, longitude);
        displayCurrentWeather(currentWeatherData);

        // Obtém as informações da previsão do tempo
        const forecastData = await getForecast(latitude, longitude);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        locationElem.textContent = 'Não foi possível obter a localização';
        currentWeatherElem.textContent = 'Não foi possível obter as informações do clima atual';
        forecastElem.textContent = 'Não foi possível obter as informações da previsão do tempo';
    }
}

init(); // Chama a função init para iniciar o aplicativo.
