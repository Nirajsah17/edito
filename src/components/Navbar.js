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
    document.body.classList.toggle("dark-theme")
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full h-12 text-fg-default">
        <div className="flex flex-row justify-center">
          <div className="flex justify-center px-2 m-2 cursor-pointer rounded">
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
            <div className="relative w-11 h-6 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
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
                  className="m-2 bg-transparent hover:bg-bg-accentEmphasis font-semibold hover:text-white py-1 px-3 border  hover:border-transparent rounded"
                >
                  SignUp
                </button>
              </div>
              <div className="px-1 flex flex-row justify-center">
                <button
                  onClick={onOpenLogin}
                  className="m-2 bg-transparent hover:bg-bg-accentEmphasis font-semibold hover:text-white py-1 px-3 border  hover:border-transparent rounded"
                >
                  Login
                </button>
                <a href="https://github.com/Nirajsah17/edito/tree/develop" target="_blank" className="flex justify-between items-center">
                  <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>
                </a>
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
