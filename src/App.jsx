import { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import SearchBar from './components/searchbar';
import WeatherCard from './components/WeatherCard';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [weatherList, setWeatherList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);


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

  const handleSearch = async (cityId) => {
    if (!cityId) return;

    try {
      const res = await fetch(`${API_URL}/weather/${cityId}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();

      const alreadyExists = weatherList.some((item) => item.id === data.id);
      if (alreadyExists) {
        alert('Bu şehir zaten eklendi.');
        return;
      }

      setWeatherList((prev) => {
        const updated = [...prev, data];
        setCurrentIndex(updated.length - 1);
        return updated;
      });
    } catch {
      alert('Şehir bulunamadı');
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
    setUser(null);
    setWeatherList([]);
    setCurrentIndex(0);
    document.body.style.backgroundImage = "none";
    localStorage.removeItem('token');
  };

  return (
    <div className="app-container">
      {showLogin && (
        <div className="login-popup">
          <AuthPage
            onLogin={(u) => {
              setUser(u);
              setShowLogin(false);
            }}
          />
        </div>
      )}

      <header className="app-header flex justify-between items-center w-full max-w-2xl p-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-md">
        <h1 className="text-xl font-semibold">Meteosphere🌤️</h1>
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm">{user.email}</span>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              onClick={handleLogout}
            >
              Çıkış Yap
            </button>
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
            onLoginRequest={() => setShowLogin(true)}
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

export default App;