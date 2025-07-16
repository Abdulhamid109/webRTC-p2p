"use client"
import { useSearchParams } from 'next/navigation'
import React, { useRef } from 'react';

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
    
  return (
    <div>RoomPage</div>
  )
}

export default RoomPage