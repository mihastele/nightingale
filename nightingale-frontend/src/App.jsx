import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import BlogList from './pages/BlogList';
import BlogEdit from './pages/BlogEdit';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/new" element={<BlogEdit />} />
          <Route path="/blog/:id" element={<BlogEdit />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;