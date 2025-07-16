"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


interface data{
  email:string,
  roomid:string
}

export default function Home() {
  const [data,setdata] = useState<data>({
    email:"",
    roomid:""
  });

  const router = useRouter();
  const handlesubmit=(e:React.FormEvent<HTMLElement>)=>{
    try {
      e.preventDefault();
    router.push(`/pages/Room?email=${encodeURIComponent(data.email)}&roomId=${encodeURIComponent(data.roomid)}`);
    } catch (error) {
      console.log("Error"+error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className=" rounded-md flex flex-col  bg-cyan-400 p-15 shadow-lg shadow-lime-700">
        <p className="p-2 text-3xl text-black">Welcome Boss</p>
        <input type="email" value={data.email} onChange={(e)=>{setdata({...data,email:e.target.value})}} className="p-2 m-2 bg-white text-2xl focus:outline rounded-md border-2 text-black border-amber-50" placeholder="Enter your email address" required/>
      <input type="text" value={data.roomid} onChange={(e)=>{setdata({...data,roomid:e.target.value})}} className="p-2 m-2 bg-white text-2xl focus:outline rounded-md border-2 text-black border-amber-50" placeholder="Enter your room id" required/>
      <button onClick={handlesubmit} className="p-2 m-2 bg-blue-500 text-2xl focus:outline rounded-md  text-black ">Join Now!!!</button>
      </div>
    </div>
  );
}
