import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/searchbar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function WeatherApp({ user, onLogout }) {
  const navigate = useNavigate();
  const [weatherList, setWeatherList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const bgUrl =
      weatherList.length === 0
        ? "/images/default.jpg"
        : `/images/${weatherList[currentIndex].id}.jpg`;

    document.body.style.backgroundImage = `url("${bgUrl}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.padding = "0";
  }, [weatherList, currentIndex]);

  const handleSearch = (cityId) => {
    const mockDatabase = {
      ankara: {
        id: "ankara",
        location_name: "Ankara",
        latitude: 39.9288,
        longitude: 32.8541,
        datetime: new Date().toISOString(),
        temperature: 24.5,
        humidity: 60,
        weather_description: "Açık",
        wind_speed: 5.4,
        wind_direction: 270,
        pressure: 1013,
        icon_code: "01d",
        expertOpinions: [
          "Önümüzdeki hafta sıcaklıklar mevsim normallerinde olacak.",
          "Rüzgar güneybatı yönünden esecek, tarım faaliyetleri için uygun." 
        ],
      },
      istanbul: {
        id: "istanbul",
        location_name: "İstanbul",
        latitude: 41.0082,
        longitude: 28.9784,
        datetime: new Date().toISOString(),
        temperature: 20.1,
        humidity: 68,
        weather_description: "Bulutlu",
        wind_speed: 4.3,
        wind_direction: 120,
        pressure: 1012,
        icon_code: "03d",
        expertOpinions: [
          "Nem oranı yüksek, kronik rahatsızlığı olanlar dikkatli olmalı.",
          "Yağış ihtimali düşük, hava çoğunlukla bulutlu seyredecek." 
        ],
      },
      izmir: {
        id: "izmir",
        location_name: "İzmir",
        latitude: 38.4192,
        longitude: 27.1287,
        datetime: new Date().toISOString(),
        temperature: 27.4,
        humidity: 55,
        weather_description: "Parçalı Bulutlu",
        wind_speed: 3.9,
        wind_direction: 90,
        pressure: 1009,
        icon_code: "02d",
        expertOpinions: [
          "Parçalı bulutlu hava deniz ulaşımını etkilemeyecek.",
          "Hafta sonu sıcaklıklar birkaç derece artacak." 
        ],
      }
    };

    const alreadyExists = weatherList.some(item => item.id === cityId);
    if (alreadyExists) {
      alert("Bu şehir zaten eklendi.");
      return;
    }
    if(!cityId)return;
    const mockData = mockDatabase[cityId];
    if (mockData) {
      setWeatherList(prev => {
        const updated = [...prev, mockData];
        setCurrentIndex(updated.length - 1); // kritik düzeltme
        return updated;
      });
    } else {
      alert("Bu şehir için test verisi yok.");
    }
  };

  const handleDelete = (id) => {
    const updated = weatherList.filter(item => item.id !== id);
    setWeatherList(updated);
    if (updated.length === 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.min(currentIndex, updated.length - 1));
    }
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    setWeatherList([]);
    setCurrentIndex(0);
    document.body.style.backgroundImage = "none";
  };

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>Meteosphere🌤️</h1>
        {user && (
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
      </header>

      <SearchBar onSearch={handleSearch} />

      {weatherList.length > 0 && weatherList[currentIndex] && (
        <div className="weather-carousel">
          <WeatherCard
            data={weatherList[currentIndex]}
            onDelete={handleDelete}
            user={user}
            onLoginRequest={() => navigate('/login')}
          />
        </div>
      )}

      {weatherList.length > 1 && (
        <div className="nav-buttons">
          <button
            onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
          >
            ⬅
          </button>
          <button
            onClick={() => setCurrentIndex(i => Math.min(i + 1, weatherList.length - 1))}
            disabled={currentIndex === weatherList.length - 1}
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
