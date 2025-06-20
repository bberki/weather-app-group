import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [username, setUsername] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername(null);
  };

  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Anasayfa</Link>
        {username ? (
          <>
            <span>{username}</span>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        ) : (
          <>
            <Link to="/login">Giriş</Link>
            <Link to="/register">Kayıt Ol</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUsername} />} />
        <Route path="/" element={<WeatherApp username={username} onLogout={handleLogout} />} />
      </Routes>
    </>
  );
}

export default App;
