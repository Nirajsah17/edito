import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import Drag from "./components/Drag";
import { useState } from "react";
export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }
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