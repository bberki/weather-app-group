import { useState } from 'react';
import './auth.css';

const API_URL = import.meta.env.VITE_API_URL;

function AuthPage( { onLogin }){
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password) {
            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                if (!res.ok) throw new Error('Login failed');
                const data = await res.json();
                localStorage.setItem('token', data.token);
                onLogin({ email });
            } catch {
                alert('Giriş başarısız');
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    {isLogin ? "Giris Yap" : "Kayit Ol"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />

                    <input
                        type="password"
                        placeholder="Sifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {isLogin ? "Giris" : "Kayit"}
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    {isLogin ? "Hesabin yok mu?" : "Zaten uye misin?"}{" "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 cursor-pointer underline"
                    >
                        {isLogin ? "Kayit Ol" : "Giris Yap"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;
