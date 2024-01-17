import { useContext, useState } from "react"
import logo from "./images/logo.svg"
import { getRandomColorWithOpacity } from '../lib/color';
import UserContext from "../lib/UserContext";

export default function Navbar({ onToggleLeftSidebar, onSignUpOpen, onLoginOpen, isLoggedIn, userLogo, logout }) {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const {user} = useContext(UserContext);
  const handleProfile = () => {
    setProfileOpen(!isProfileOpen)
  }

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row justify-center">
        <div className="flex justify-center px-2 m-2 hover:bg-slate-200 cursor-pointer rounded" onClick={onToggleLeftSidebar}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
          </button>
        </div>
        <div className="flex flex-row justify-center px-2">
          <img src={logo} height={75} width={30}></img>
        </div>
        <div className="flex justify-center px-2 items-center">Edito</div>
      </div>
      <div className="flex flex-row">
        {
          isLoggedIn ?
            <div className="px-0.5 flex flex-row justify-center">
              <button onClick={handleProfile} className="flex px-4 py-1 m-1 items-center justify-center rounded-3xl border bg-orange-500 text-white cursor-pointer hover:border-2 hover:border-gray-400" title={user.email} style={{ backgroundColor: userLogo.color }}>{userLogo.logo}</button>
              {isProfileOpen ? <div className="flex bg-gray-50 flex-col w-32 absolute z-20 mt-10 mr-10 border">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  <button className="">Profile</button>
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  <button onClick={logout} className="">Logout</button>
                </div>
              </div> : ''}
            </div> :
            <>
              <div className="px-0.5 flex flex-row justify-center">
                <button onClick={onSignUpOpen} className="m-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-3 border border-purple-500 hover:border-transparent rounded">SignUp</button>
              </div>
              <div className="px-1 flex flex-row justify-center">
                <button onClick={onLoginOpen} className="m-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-3 border border-purple-500 hover:border-transparent rounded">Login</button>
              </div>
            </>
        }
      </div>
    </div>
  )
}