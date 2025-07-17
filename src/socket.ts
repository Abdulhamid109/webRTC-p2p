// import { createServer } from "http";
// import { Server } from "socket.io";
// import next from 'next';


// // dev environments
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({dev});
// const handle = app.getRequestHandler();

// interface User{
//     email:string,
//     id:string
// }

// interface ServerToClientEvents{
//     'user-joined':(userId:string,userEmail:string)=>void;
//     'user-left':(userId:string)=>void;
//     'offer':(offer:RTCSessionDescriptionInit,fromUserId:string)=>void;
//     'answer':(answer:RTCSessionDescriptionInit,fromUserId:string)=>void;
//     'ice-candidate':(candidate:RTCIceCandidateInit,fromUserId:string)=>void;
// }

// interface ClientToServerEvents{
//     'join-room':(roomId:string,userEmail:string)=>void;
//     'offer':(offer:RTCSessionDescriptionInit,roomId:string)=>void;
//     'answer':(answer:RTCSessionDescriptionInit,roomId:string)=>void;
//     'ice-candidate':(candidate:RTCIceCandidateInit,roomId:string)=>void
// }

// app.prepare().then(()=>{
//     const server = createServer((req,res)=>{
//         handle(req,res)
//     })


// const io = new Server<ClientToServerEvents,ServerToClientEvents>(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST"]
//     }
// })

// // 
// const rooms = new Map<string,Set<User>>(); //for mapping the roomids with set of users

// io.on('connection',(socket)=>{
//     console.log("User Connected :",socket.id);
//     socket.on('join-room',(roomId:string,userEmail:string)=>{
//         socket.join(roomId);

//         // Initialize room if it doesn't exist
//         if(!rooms.has(roomId)){
//             rooms.set(roomId,new Set());
//         }

//         // Add the user to room
//         const user:User = {id:socket.id,email:userEmail};
//         rooms.get(roomId)!.add(user);
//         // console.log("User-joined"+user);

//         // Notify the existing members about the new member
//         socket.to(roomId).emit('user-joined',socket.id,userEmail);
//         console.log(`User ${userEmail} joined room ${roomId}`);
//     });

//     //offer
//     socket.on('offer',(offer:RTCSessionDescriptionInit,roomId:string)=>{
//         socket.to(roomId).emit("offer",offer,socket.id);
//     });
//     // answer
//     socket.on("answer",(answer:RTCSessionDescriptionInit,roomId:string)=>{
//         socket.to(roomId).emit("answer",answer,roomId);
//     });
//     // Ice candidates
//     socket.on("ice-candidate",(candidate: RTCIceCandidateInit, roomId: string)=>{
//         socket.to(roomId).emit("ice-candidate",candidate,socket.id);
//     });

//     // Handle disconnection
//     socket.on('disconnect',()=>{
//         console.log("User Disconnected:",socket.id);

//         // remove the user from the room and notify the other users of leaving the room
//         rooms.forEach((users,roomid)=>{
//             for(const user of users){
//                 if(user.id===socket.id){
//                     users.delete(user);
//                     socket.to(roomid).emit('user-left',socket.id);
//                     break;
//                 }

//             }
//         })
//     })
// });


// const PORT = 3000;
// server.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`)
// })
// });