import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext.jsx';
export default function Navbar() {
    const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="font-bold">Nightingale</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/blog">Blog</Link>
      {user ? (
        <>
          <span className="ml-auto mr-2">Hello, {user.username}</span>
          <button onClick={logout} className="text-red-300 hover:underline">Logout</button>
        </>
      ) : (
        <>
          <Link to="/register" className="ml-auto">Register</Link>
          <Link to="/" >Login</Link>
        </>
      )}
    </nav>
  )
}
