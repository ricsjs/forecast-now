import './app.css';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import api from './services/api';
import { useState, useEffect } from 'react';

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  //lat=39.31
  //lon=-74.5

  const showInfo = async () => {
    try {
      const response = await api.get("/weather", {
        params: {
          lat: lat,
          lon: lon,
          appid: "d54d9d02c25c79b822c4d38bbc3a1e47"
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      setError("Erro ao obter os dados do clima. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    if (lat && lon) {
      showInfo();
    }
  }, [lat, lon]);

  return (
    <div>
      <Header />
      <main className='main'>
        <h2>Previsão do tempo agora</h2>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type='text'
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />

        {error && <p>{error}</p>}

        {weatherData && (
          <div>
            <p>Temperatura: {weatherData.main.temp}°C</p>
            <p>Descrição: {weatherData.weather[0].description}</p>
            {/* Exibir mais informações do clima, se necessário */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
