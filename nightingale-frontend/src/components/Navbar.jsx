import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="font-bold">Nightingale</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/profile" className="ml-auto">Profile</Link>
    </nav>
  )
}
