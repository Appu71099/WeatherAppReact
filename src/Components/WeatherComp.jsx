// import React from 'react'
import React, { useState } from 'react';
// import './Weaher.css '
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import cloud_icon from '../Assets/cloud.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import './Weaher.css'
import axios from 'axios';



export default function WeatherComp() {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);


    const fetchWeather = async () =>{

        try{
            const featchWeather = async (city) =>{
                const resp = await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather',
                    {
                        params:{
                            q:city,
                            appid:'3ec8e193c6fa6d30e225f5572427e362'
                        }
                    }
                );
                setWeather(resp);
                console.log(resp)
            }
        }catch(err){
            console.error(err)
        }
        
    }

    const getData = (e) =>{
        e.preventDefault();
        console.log(`City : ${city}`);
    }
   
   
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)} />
        <img src={search_icon} alt="" onClick={fetchWeather} />
      </div>
      <img src={cloud_icon} alt=""  className='weather-icon'/>
      <p className='temprature'>16* c</p>
      <p className='location'>London</p>

      <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon} alt="" />
            <div>
                <p>91%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind_icon} alt="" />
            <div>
                <p>3.6 km/hr</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
    </div>
  )
}
