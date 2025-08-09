import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '~/stores/auth';

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { accessToken } = useAuth.getState();

  const connect = () => {
    const token = accessToken;
    if (!token) {
      return;
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? '', {
      // query: { token: token },
      extraHeaders: {
        authorization: token,
      },
    });

    setSocket(socket);
  };

  useEffect(() => {
    connect();

    return () => {
      if (!socket) {
        return;
      }
      socket.disconnect();
    };
  }, []);

  return { socket, connect };
}
