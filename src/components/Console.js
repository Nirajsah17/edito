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
      <div className="flex h-full w-full flex-col border absolute top-80 left-0 bg-white z-20">
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
              className="w-full resize-none overflow-x-hidden overflow-y-hidden caret-purple-800 focus:outline-none"
              type="text"
              wrap="soft"
            ></textarea>
          </div>
        </div>
      </div>
      ;
    </>
  );
}