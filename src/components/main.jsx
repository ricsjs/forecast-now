import './main.css'
import api from '../services/api'
import { useState } from 'react';

import { BsSearch } from 'react-icons/bs'

function Main() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const showInfo = async () => {
        try {
            const response = await api.get("/weather", {
                params: {
                    q: city,
                    units: "metric",
                    appid: "d54d9d02c25c79b822c4d38bbc3a1e47",
                    lang: "pt_br"
                }
            });
            setWeatherData(response.data);
            setCity('');
        } catch (error) {
            setError("Erro ao obter os dados do clima. Por favor, tente novamente.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showInfo();
    };

    const pngTemp = weatherData && weatherData.weather[0].icon
        ? `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        : null;

    //consulta: https://api.openweathermap.org/data/2.5/weather?q=london&appid=d54d9d02c25c79b822c4d38bbc3a1e47&lang=pt_br
    //link api: https://openweathermap.org/current

    return (
        <div className='container'>
            <div className='content'>
                <h2 className='title'>Weather Forecast Now</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-content'>
                        <div className='input'>
                            <input
                                placeholder='Type a city name...'
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className='search'>
                            <button className='btn-search' type='submit'><BsSearch /></button>
                        </div>
                    </div>
                </form>

                {weatherData && (
                    <div className='infos'>
                        <div>
                            <span className='span'>
                                <img className='pngTemp' src={pngTemp} />
                                {weatherData.sys.country},&nbsp;
                                {weatherData.name},&nbsp;
                                {weatherData.main.temp}ºC,&nbsp; 
                                {weatherData.weather[0].description}
                            </span>
                        </div>
                        <div>
                            <span className='spanMin'>
                                Max Temperature {weatherData.main.temp_max}ºC | Min Temperature {weatherData.main.temp_min}ºC
                            </span>
                        </div>
                        <div>
                            <span className='spanMin'>Humidity {weatherData.main.humidity}%</span>
                        </div>
                    </div>
                )}

                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Main