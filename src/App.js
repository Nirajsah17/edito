import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Store from "./storeDB";

export default function App() {
  const UserStore = new Store();
  // UserStore.addUser("email",{ id: 1, usename: "niraj", email: "niraj@yml.com" });
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }

  const isSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
    console.log(isSignUpOpen);
  }

  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div className="flex flex-row w-full h-12">
        <Navbar onToggleLeftSidebar={isOpen} onSignUpOpen={isSignUp}></Navbar>
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex flex-row">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen}></LeftSideBar>
          </div>
          <div className="flex relative">
            {isSignUpOpen ?
              <SignUp onSignUpOpen={isSignUp}></SignUp> : ''}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center h-12 w-full border">footer</div>
    </div>
  )
}