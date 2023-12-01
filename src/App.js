import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import MainBody from "./components/MainBody"
import SignUp from "./components/SignUp";
import { useState } from "react";
import Store from "./storeDB";

export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }

  useEffect(() => {
    const store = new Store();

    // Add a user after waiting for the database to initialize
    const addUserAsync = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

      // Create a new user
      await store.addUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

      // Retrieve the user by ID
      // await store.getUserById(13);
      const ids = await store.getAllUserIds();

    };

    addUserAsync();
  }, []);
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
        <div className="w-full h-full flex flex-row">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen}></LeftSideBar>
          </div>
          <div className="w-full h-full flex relative">
            {isSignUpOpen ?
              <SignUp onSignUpOpen={isSignUp}></SignUp> : ''}
            <MainBody></MainBody>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-gray-50 justify-center h-12 w-full border">footer</div>
    </div>
  )
}