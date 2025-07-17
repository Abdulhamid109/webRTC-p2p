import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface User {
  email: string;
  id: string;
}

interface ServerToClientEvents {
  'user-joined': (userId: string, userEmail: string) => void;
  'user-left': (userId: string) => void;
  'offer': (offer: RTCSessionDescriptionInit, fromUserId: string) => void;
  'answer': (answer: RTCSessionDescriptionInit, fromUserId: string) => void;
  'ice-candidate': (candidate: RTCIceCandidateInit, fromUserId: string) => void;
}

interface ClientToServerEvents {
  'join-room': (roomId: string, userEmail: string) => void;
  'offer': (offer: RTCSessionDescriptionInit, roomId: string) => void;
  'answer': (answer: RTCSessionDescriptionInit, roomId: string) => void;
  'ice-candidate': (candidate: RTCIceCandidateInit, roomId: string) => void;
}

interface InterServerEvents {}

interface SocketData {}

const rooms = new Map<string, Set<User>>();

let io: SocketIOServer | null = null;

export async function GET(req: NextApiRequest, res: NextApiResponse & { socket: { server: NetServer & { io?: SocketIOServer } } }) {
  if (!io) {
    console.log('Initializing the socket server');
    const httpServer: NetServer = res.socket!.server;
    io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
      path: '/api/socket',
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('User Connected!!!');

      socket.on('join-room', (roomId: string, userEmail: string) => {
        socket.join(roomId);
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }
        const user: User = { id: socket.id, email: userEmail };
        rooms.get(roomId)!.add(user);
        // Notify the existing room members
        socket.to(roomId).emit('user-joined', socket.id, userEmail);
        console.log(`User ${userEmail} joined room ${roomId}`);
      });

      socket.on('disconnect', () => {
        console.log('User Disconnected!!!');
      });
    });
  }

  res.end();
}
