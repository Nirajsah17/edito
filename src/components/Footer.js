import { useEffect, useState, useContext } from "react";
import UserContext from "../lib/UserContext.js";

function Footer() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div>
          <input type="text" placeholder="type user id here... "/>
          <button ></button>
          <button >send</button>
        </div>
        <div className="flex flex-row">
          <div className="p-2"></div>
          <div className="">
            <button
              className="p-2 bg-purple-600 text-white"
            >
              connect ?
            </button>
          </div>
          <input type="text" placeholder="chat" />
          <button >send</button>
        </div>
        <div className="pr-8">
          <button className="w-20 rounded-md bg-purple-500 text-white border border-purple-500 p-1 hover:bg-purple-700 hover:text-white">save</button>
        </div>
      </div>
    </>
  );
}
export default Footer;
export { Footer };
