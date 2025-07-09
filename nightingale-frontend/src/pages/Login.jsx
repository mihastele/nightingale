import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
    const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      login(data.token, { username });
      navigate('/chat');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4" >
      <h1 className="text-3xl font-bold">Login</h1>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="border p-2 w-64" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="border p-2 w-64" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-64">Login</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}
