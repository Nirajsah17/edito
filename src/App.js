import { useEffect } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import { useState } from "react";
import Store from "./storeDB";

export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
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
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div className="flex flex-row w-full h-12">
        <Navbar onToggleLeftSidebar={isOpen}></Navbar>
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex flex-row">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen}></LeftSideBar>
          </div>
          <div>
            hhh
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center h-12 w-full border">footer</div>
    </div>
  )
}