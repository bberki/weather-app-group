import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/auth.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) return;
    alert('Kayıt başarılı!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Kayıt Ol</button>
        </form>
        <p className="toggle-text">
          Zaten üye misin? <Link to="/login">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
