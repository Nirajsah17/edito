import { useContext, useState, useEffect } from "react";
import logo from "./images/logo.svg";
import { getRandomColorWithOpacity } from "../lib/color";
import UserContext from "../lib/UserContext";
import FileContext from "../lib/FileContext";
import Profile from "./Profile";
export default function Navbar({
  onToggleSidebar,
  onOpenSignup,
  onOpenLogin,
  userName,
  setUserName,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { dir, setDirectory } = useContext(FileContext);

  const onLogout = () => {
    setUserName("");
    setProfileOpen(false);
    localStorage.removeItem("user");
    setDirectory([]);
  };

  const handleMode = (e) => {
    document.body.classList.toggle("dark")
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full h-12">
        <div className="flex flex-row justify-center">
          <div className="flex justify-center px-2 m-2 hover:bg-slate-200 cursor-pointer rounded">
            <button onClick={onToggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-row justify-center px-2">
            <img src={logo} height={75} width={30} alt="Logo" />
          </div>
          <div className="flex justify-center px-2 items-center">Edito</div>
        </div>
        <div className="flex flex-row">
          <label className="inline-flex items-center me-5 cursor-pointer">
          <input type="checkbox" onChange={handleMode} value="" className="sr-only peer"></input>
          <div className="relative w-11 h-6 rounded-full peer dark:bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
          </label>
          {userName ? (
            <div className="m-1 flex flex-row justify-center relative">
              <button
                onClick={() => {
                  setProfileOpen(true);
                }}
                className="flex items-center justify-center rounded-full px-3.5 border bg-orange-500 text-white cursor-pointer hover:border-1 hover:border-gray-400"
                title={userName}
              >
                {userName.charAt(0)}
              </button>
            </div>
          ) : (
            <>
              <div className="px-0.5 flex flex-row justify-center">
                <button
                  onClick={onOpenSignup}
                  className="m-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-3 border border-purple-500 hover:border-transparent rounded"
                >
                  SignUp
                </button>
              </div>
              <div className="px-1 flex flex-row justify-center">
                <button
                  onClick={onOpenLogin}
                  className="m-2 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-1 px-3 border border-purple-500 hover:border-transparent rounded"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {profileOpen ? (
        <Profile
          logoutUser={() => {
            onLogout();
          }}
          closeProfile={() => {
            setProfileOpen(false);
          }}
        ></Profile>
      ) : null}
    </>
  );
}
