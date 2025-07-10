import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Very thin wrapper around WebRTC peer connection for 1-to-1 calls.
export default function Call() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const wsRef = useRef(null);
  const [status, setStatus] = useState('init');

  useEffect(() => {
    const room = roomId || 'default';
    // open websocket signalling
    const ws = new WebSocket(`ws://${window.location.hostname}:8080/ws/call/${room}`);
    wsRef.current = ws;

    ws.onmessage = async (e) => {
      const msg = JSON.parse(e.data);
      if (!pcRef.current) return;
      switch (msg.type) {
        case 'offer':
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(msg.offer));
          const answer = await pcRef.current.createAnswer();
          await pcRef.current.setLocalDescription(answer);
          ws.send(JSON.stringify({ type: 'answer', answer }));
          break;
        case 'answer':
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(msg.answer));
          break;
        case 'ice':
          if (msg.candidate) {
            try { await pcRef.current.addIceCandidate(msg.candidate); } catch (_) {}
          }
          break;
        default:
          break;
      }
    };

    ws.onopen = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      // Peer connection
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
      pcRef.current = pc;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          ws.send(JSON.stringify({ type: 'ice', candidate: e.candidate }));
        }
      };

      pc.ontrack = (e) => {
        remoteVideoRef.current.srcObject = e.streams[0];
      };

      // First participant becomes caller and sends offer
      if (ws.readyState === 1) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ type: 'offer', offer }));
      }
      setStatus('connected');
    };

    return () => {
      ws.close();
      pcRef.current?.close();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Video Call</h1>
      <div className="flex gap-4">
        <video ref={localVideoRef} autoPlay playsInline muted className="w-64 h-48 bg-black" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 bg-black" />
      </div>
      <button onClick={() => navigate('/')} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Hang Up</button>
      <p className="text-gray-600">{status}</p>
    </div>
  );
}
