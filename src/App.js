import Navbar from "./components/Navbar"
import LeftSideBar from "./components/LeftSidebar"
export default function App() {
  return (
    <div className="h-full w-full p-0 m-0">
      <Navbar></Navbar>
      <LeftSideBar isOpen="" ></LeftSideBar>
    </div>
  )
}