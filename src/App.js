import EditoDb from "./storeDB";
import { uuid } from "./lib/utility";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar.js";
import MainBody from "./components/MainBody";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
import Footer from "./components/Footer";

import UserContext from "./lib/UserContext";
import FileContext from "./lib/FileContext";

const store = new EditoDb();
store.init();
window["edito"] = store;

export default function App() {
  // Users context for User Info
  const { users } = useContext(UserContext);
  const [user, setUser] = useState(users);

  const { dir } = useContext(FileContext);
  const [directory, setDirectory] = useState(dir.children);


  document.addEventListener("onSignUp",(e)=>{
    // console.log("events",e);
  });

  return (
    <FileContext.Provider value={{ dir: directory, setDirectory }}>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <div className="flex flex-col justify-between h-screen w-full">
          <div className="shadow-md">
            <Navbar></Navbar>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-row h-full w-full">
              <div>
                <LeftSideBar isOpen={true} ></LeftSideBar>
              </div>
              <div className="relative h-full w-full">
                <MainBody currentCode={''} openCode={''} ></MainBody>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 h-12 w-full border">
            <Footer></Footer>
          </div>
        </div>
      </UserContext.Provider>
    </FileContext.Provider>
  );
}
