console.log("I am alive!");

const API_KEY = 'd62a84f583dd940bf61efc3461848a9d';

const getWeatherData = async (location) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`, {mode: 'cors'});
    const weatherData = await response.json();

    let weatherInfo = [];

    const temp = weatherData.main.temp;
    const temp_max = weatherData.main.temp_max;
    const temp_min = weatherData.main.temp_min;
    const feels_like = weatherData.main.feels_like;
    const wind_speed = weatherData.wind.speed;
    const longitude = weatherData.coord.lon;
    const latitude = weatherData.coord.lat;
    const weather = weatherData.weather[0].main;
    const humidity = weatherData.main.humidity;

    console.log(weatherData);
    console.log(`Temperature: ${weatherData.main.temp} Kelvin`);
    console.log(`Feels like: ${weatherData.main.feels_like} Kelvin`);
    console.log(`Min temp: ${weatherData.main.temp_min} Kelvin, Max temp: ${weatherData.main.temp_max} Kelvin`);
    console.log(`Wind speed: ${weatherData.wind.speed} m/s`);
    console.log(`Longitude: ${weatherData.coord.lon} , Latitude: ${weatherData.coord.lat}`);
    console.log(`Weather: ${weatherData.weather[0].main}`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);

    weatherInfo[0] = temp;
    weatherInfo[1] = temp_max;
    weatherInfo[2] = temp_min;
    weatherInfo[3] = feels_like;
    weatherInfo[4] = wind_speed;
    weatherInfo[5] = longitude;
    weatherInfo[6] = latitude;
    weatherInfo[7] = weather;
    weatherInfo[8] = humidity;

    console.log(weatherInfo);

    return weatherInfo;
}

getWeatherData('Delhi');