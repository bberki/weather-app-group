import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/auth.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      localStorage.setItem('token', data.token);
      if (onLogin) onLogin({ email: username, token: data.token });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Giriş başarısız');
    }
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
