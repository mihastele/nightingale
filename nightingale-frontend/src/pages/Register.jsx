import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSuccess(true);
      setTimeout(()=>navigate('/'), 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Register</h1>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" className="border p-2 w-64" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="border p-2 w-64" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-64">Register</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Registration successful! Redirecting...</p>}
    </form>
  )
}
