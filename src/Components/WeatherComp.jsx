import React, { useState } from 'react';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import './Weaher.css';
import axios from 'axios';

export default function WeatherComp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [icons, setIcons] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }

    const fetchWeather = async () => {
        try {
            const resp = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather',
                {
                    params: {
                        q: city,
                        appid: '3ec8e193c6fa6d30e225f5572427e362'
                    }
                }
            );
            setWeather(resp.data);
            setIcons(allIcons[resp.data.weather[0].icon]);
            console.log(resp.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data.cod === "404") {
                alert(err.response.data.message);
            } else {
                alert("An error occurred while fetching the weather data. Please try again.");
            }
        }
    }

    const getData = (e) => {
        e.preventDefault();
        console.log(`City: ${city}`);
        fetchWeather();
    }

    return (
        <div className={`weather ${darkMode ? 'dark-mode' : 'light-mode'} container`}>
            <div className="toggle-mode mb-4 text-center">
                <button className="btn btn-outline-primary" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>

            <div className="search-bar input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={getData}>
                    <img src={search_icon} alt="search" />
                </button>
            </div>

            {weather && (
                <div className="text-center">
                    <img src={icons} alt="weather" className="weather-icon img-fluid mb-4" />
                    <p className="temprature display-1">{Math.round(weather.main.temp - 273.15)}°C</p>
                    <p className="location h2">{weather.name}</p>

                    <div className="weather-data d-flex mt-4 d-flex">
                        <div className="col-6 d-flex flex-column align-items-center">
                            <img src={humidity_icon} alt="humidity" className="img-fluid mb-2" />
                            <p className="h4">{weather.main.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                        <div className="col-6 d-flex flex-column align-items-center">
                            <img src={wind_icon} alt="wind" className="img-fluid mb-2" />
                            <p className="h4">{weather.wind.speed} km/hr</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
