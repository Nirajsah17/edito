import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Store from "./storeDB";

export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }
 const handleFormSubmit = (formData) => {
   // Do something with the form data, e.g., send it to an API
   console.log('Form data received in App:', formData);
 };

useEffect(() => {
  const store = new Store();

  // Add a user after waiting for the database to initialize
  const addUserAsync = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

    // Create a new user
    await store.addUser({
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      color: ''
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
        <div className="flex flex-row">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen}></LeftSideBar>
          </div>
          <div className="flex justify-center relative">
            {isSignUpOpen ?
              <SignUp onSignUpOpen={isSignUp} onSubmit={handleFormSubmit}></SignUp> : ''}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center h-12 w-full border">footer</div>
    </div>
  )
}