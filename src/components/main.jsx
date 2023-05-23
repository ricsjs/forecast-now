import './main.css'
import api from '../services/api'
import { useState } from 'react';

import { BsSearch } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'

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
            setError(null)
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
        : null

    let messageHumidity = '';
    if (weatherData && weatherData.main && weatherData.main.humidity) {
        if (weatherData.main.humidity <= 33) {
            messageHumidity = 'Baixas probabilidades de chuva';
        } else if (weatherData.main.humidity > 33 && weatherData.main.humidity < 66) {
            messageHumidity = 'Probabilidade média de chuva';
        } else if (weatherData.main.humidity >= 66) {
            messageHumidity = 'Altas probabilidades de chuva';
        }
    }


    return (
        <div className='container'>
            <div className='content'>
                <h2 className='title'>Configura a Previsão do Tempo Agora</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-content'>
                        <div className='input'>
                            <input
                                placeholder='Digite uma cidade...'
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
                                <img className='pngTemp' src={pngTemp} alt='Weather Icon' />
                                <b>{weatherData.sys.country},&nbsp;
                                {weatherData.name},&nbsp;
                                {weatherData.main.temp}ºC,&nbsp;
                                {weatherData.weather[0].description}</b>
                            </span>
                        </div>
                        <div>
                            <span className='spanMin'>
                                A sensação térmica em <b>{weatherData.name}</b> é de <b>{weatherData.main.feels_like}ºC</b>
                            </span>
                        </div>
                        <div className='divHumidity'>
                            <div>
                                <WiHumidity size={26} color='#282c34' />
                            </div>
                            <div>
                                <span className='spanMin'>Humidity {weatherData.main.humidity}% | {messageHumidity}</span>
                            </div>
                        </div>
                    </div>
                )}

                {error && <p style={{color:"red"}}>{error}</p>}
            </div>
        </div>
    );
}

export default Main