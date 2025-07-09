import { BrowserRouter, Routes, Route } from 'react-router-dom';
;
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import BlogList from './pages/BlogList';
import BlogEdit from './pages/BlogEdit';


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import BlogList from './pages/BlogList'
import BlogEdit from './pages/BlogEdit'


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import BlogList from './pages/BlogList'
import BlogEdit from './pages/BlogEdit'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogEdit />} />
      </Routes>
    </BrowserRouter>
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
