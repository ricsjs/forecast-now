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
        } catch (error) {
            setError("Erro ao obter os dados do clima. Por favor, tente novamente.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        showInfo();
    };

    return (
        <div className='container'>
            <div className='content'>
                <h2 className='title'>Previsão do tempo agora</h2>
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
                            <button className='btn-search' type='submit'><BsSearch/></button>
                        </div>
                    </div>
                </form>

                {weatherData && (
                    <div>
                        <p>Temperatura: {weatherData.main.temp}°C</p>
                        <p>Descrição: {weatherData.weather[0].description}</p>
                        <p>Icon: {weatherData.weather[0].icon}</p>
                        {/* Exibir mais informações do clima, se necessário */}
                    </div>
                )}

                {error && <p>{error}</p>}
            </div>
        </div>
    );
}

export default Main