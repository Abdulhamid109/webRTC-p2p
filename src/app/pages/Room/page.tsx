"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

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

const RoomPage = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const roomId = searchParams.get('roomId');

    console.log(email,roomId);
    // refs for local and remote streams
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // WebRTC and Socket refs
    const socketRef = useRef<Socket<ServerToClientEvents,ClientToServerEvents>|null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection |null>(null);
    const localStreamRef = useRef<MediaStream|null>(null);

    // conn status
    const [isConnected,setIsConnected] = useState<boolean>(false);
    const [remoteUserEmail,setRemoteUserEmail] = useState<string>('');


    useEffect(()=>{
        if(!email || !roomId) return;

        initializeSocket();
    },[])

    const initializeSocket= ()=>{
        try {
            socketRef.current = io('http://localhost:3000',{
                path:'/src/helper/socket.ts'
            });

        socketRef.current.on('connect',()=>{
            console.log('Done Connecting to Server...');
            setIsConnected(true);

            socketRef.current!.emit('join-room',roomId!,email!);
        })
        } catch (error) {
            console.log('Error '+error);
        }
    }
  return (
    <div>RoomPage</div>
  )
}

export default RoomPage