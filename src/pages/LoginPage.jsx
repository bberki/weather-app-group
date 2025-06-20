import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/auth.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    localStorage.setItem('token', 'fake-jwt-token');
    if (onLogin) onLogin(username);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Giriş</button>
        </form>
        <p className="toggle-text">
          Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
