import { useState } from 'react';
import './auth.css';

function AuthPage( { onLogin }){
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) return;

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) throw new Error('login failed');

            const data = await res.json();
            onLogin({ email, token: data.token });
        } catch {
            alert('Giris basarisiz');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Giris Yap": "Kayit Ol"}</h2>
                <form onSubmit = {handleSubmit}>
                    <input
                        type="email"
                        placeholder='E-posta'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type='password'
                        placeholder='Sifre'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type='submit'>{isLogin ? "Giris" : "Kayit"}</button>
                </form>

                <p className='toggle-text'>
                    {isLogin ? "Hesabin yok mu?" : "Zaten uye misin?"}{" "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Kayit Ol" : "Giris Yap"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;