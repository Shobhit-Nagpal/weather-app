console.log("I am alive!");

const API_KEY = 'd62a84f583dd940bf61efc3461848a9d';

const searchBtn = document.getElementById('searchBtn');
const form = document.getElementById('form')

let weatherInfo = [];

window.addEventListener("load" , async ()=> {
    const response = await getWeatherData("Delhi");
    updateWeatherData(response);
});

form.addEventListener('submit', (e)=> {
    e.preventDefault();
});

searchBtn.addEventListener('click', async ()=> {
    let city = document.getElementById('city').value;
    console.log(city);

    if (city.length === 0) {
        alert('Cannot find weather of nowhere :)');
        return;
    }
    
    const response = await getWeatherData(city);
    updateWeatherData(response);
});

const getWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`, {mode: 'cors'});
        const weatherData = await response.json();

        const temp = weatherData.main.temp;
        const temp_max = weatherData.main.temp_max;
        const temp_min = weatherData.main.temp_min;
        const feels_like = weatherData.main.feels_like;
        const wind_speed = weatherData.wind.speed;
        const longitude = weatherData.coord.lon;
        const latitude = weatherData.coord.lat;
        const weather = weatherData.weather[0].main;
        const humidity = weatherData.main.humidity;
        const name = weatherData.name;

        console.log(weatherData);
        /*console.log(`Temperature: ${weatherData.main.temp} Kelvin`);
        console.log(`Feels like: ${weatherData.main.feels_like} Kelvin`);
        console.log(`Min temp: ${weatherData.main.temp_min} Kelvin, Max temp: ${weatherData.main.temp_max} Kelvin`);
        console.log(`Wind speed: ${weatherData.wind.speed} m/s`);
        console.log(`Longitude: ${weatherData.coord.lon} , Latitude: ${weatherData.coord.lat}`);
        console.log(`Weather: ${weatherData.weather[0].main}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);*/

        weatherInfo[0] = convertToCelsius(temp);
        weatherInfo[1] = convertToCelsius(temp_max);
        weatherInfo[2] = convertToCelsius(temp_min);
        weatherInfo[3] = convertToCelsius(feels_like);
        weatherInfo[4] = wind_speed;
        weatherInfo[5] = longitude;
        weatherInfo[6] = latitude;
        weatherInfo[7] = weather;
        weatherInfo[8] = humidity;
        weatherInfo[9] = name;

        //console.log(weatherInfo);

        return weatherInfo;
    }
    catch (e) {
        console.log("Error");
    }
}

const updateWeatherData = (weatherInfo) => {
    const weather = document.getElementById('weather');
    const temp = document.getElementById('temp');
    const min_temp = document.getElementById('min_temp');
    const max_temp = document.getElementById('max_temp');
    const feels_like = document.getElementById('feels_like');
    const humidity = document.getElementById('humidity');
    const coordinates = document.getElementById('coordinates');
    const winds = document.getElementById('winds');
    const location = document.getElementById('location');

    temp.textContent = weatherInfo[0];
    max_temp.textContent = weatherInfo[1];
    min_temp.textContent = weatherInfo[2];
    feels_like.textContent = weatherInfo[3];
    winds.textContent = weatherInfo[4];
    coordinates.textContent = `${weatherInfo[5]}, ${weatherInfo[6]}`;
    weather.textContent = weatherInfo[7];
    humidity.textContent = weatherInfo[8];
    location.textContent = weatherInfo[9];
}


const convertToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
}