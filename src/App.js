import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import Drag from "./components/Drag";
import { useState } from "react";
export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const isOpen = ()=>{
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }
  return (
    <div className="h-full w-full p-0 m-0">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="w-full h-full">
          <Navbar onToggleLeftSidebar={isOpen}></Navbar>
        </div>
        <div className="w-full h-full flex flex-row">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen} ></LeftSideBar>
          </div>
          <div className="w-full h-full flex flex-1">
          <Drag></Drag>
          </div>
        </div>
        <div className="w-full h-5 border-t"></div>
      </div>
    </div>
  )
}