import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext.jsx';
export default function Navbar() {
    const { user, logout } = useAuth();
  return (
    <nav className="bg-indigo-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">Nightingale</Link>
        <div className="flex space-x-4">
          <Link to="/chat" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors">Chat</Link>
          <Link to="/call" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors">Call</Link>
          <Link to="/blog" className="px-3 py-2 rounded-md hover:bg-indigo-600 transition-colors">Blog</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-indigo-200">Hello, {user.username}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors">Register</Link>
              <Link to="/" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
