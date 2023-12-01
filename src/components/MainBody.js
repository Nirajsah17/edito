import { useState } from "react";

function MainBody() {
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex flex-row h-9 border-b bg-gray-100">
          <div className="flex flex-row justify-between border-r hover:bg-gray-200 cursor-pointer">
            <div className="p-2">main.js</div>
            <div className="p-2 cursor-pointer hover:bg-gray-300">X</div>
          </div>
          <div className="flex flex-row justify-between border-r bg-gray-300 cursor-pointer">
            <div className="p-2">index.js</div>
            <div className="p-2 cursor-pointer hover:bg-gray-300">X</div>
          </div>
        </div>
        <div className="w-full flex flex-1">
          <div className="flex flex-1">
            <div className="w-6 p-2 border-r">
              1.
            </div>
            <div className="flex flex-1" contentEditable="true"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainBody;
export { MainBody };