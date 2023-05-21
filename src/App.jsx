import './app.css';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import api from './services/api';
import { useState, useEffect } from 'react';

function App() {
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
            {/* Exibir mais informações do clima, se necessário */}
          </div>
        )}

        {error && <p>{error}</p>}
      </main>
      <Footer />
    </div>
  );
}

export default App;
