import { useEffect, useState } from "react";


export default function Console (){
  let [userName,setUserName] = useState("");
  useEffect(()=>{
    let user = localStorage.getItem("user")
    console.log(user);
    setUserName(user)
  },[]);

  return (
    <>
      < div className = "w-full h-full flex flex-col top-0 left-0 z-10">
        <div className="flex">
          <div className="cursor-pointer rounded-sm p-2 hover:bg-gray-300">
            TERMINAL
          </div>
          <div className="cursor-pointer rounded-sm p-2 hover:bg-gray-300">
            DEBUG CONSOLE
          </div>
        </div>
        <div className="flex flex-1 flex-col border">
          <div className="flex">
            <span className="text-green-500">$</span>{" "}
            <span className="text-purple-700">{userName}</span> : 
            <textarea
              className = "h-full w-full scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin"
              type="text"
              wrap="soft"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}