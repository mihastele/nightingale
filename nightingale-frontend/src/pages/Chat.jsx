import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Chat() {
    const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/chat');
    ws.onmessage = (e) => setMessages((prev) => [...prev, { me: false, text: e.data }]);
    wsRef.current = ws;
    return () => ws.close();
  }, []);

  const send = () => {
    if (input && wsRef.current?.readyState === 1) {
      wsRef.current.send(input);
      setMessages((prev) => [...prev, { me: true, text: input }]);
      setInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        {/* Messages will go here */}
        <div className="text-center text-gray-500 mt-32">
          {messages.map((m,i)=>(<div key={i} className={m.me? 'text-right':'text-left'}>
            <span className={m.me? 'bg-blue-600 text-white':'bg-gray-300'} style={{padding:'4px 8px', borderRadius:8}}>{m.text}</span>
          </div>))}
          {!messages.length && <div className="text-center text-gray-500 mt-32">Start a conversation...</div>}
        </div>
      </div>
      <div className="flex gap-2">
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message..." className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={send} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Send</button>
      </div>
    </div>
  );
}
