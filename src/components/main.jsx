import api from './services/api';
import { useState } from 'react';

function Main() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    return (
        <div>
            <Header />
            <main className='main'>
                <h2>Previsão do tempo agora</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type='submit'>Pesquisar</button>
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
            </main>
            <Footer />
        </div>
    );
}

export default Main