import EditoDb from "./storeDB";
import { uuid } from "./lib/utility";
import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar.js";
import MainBody from "./components/MainBody";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Footer from "./components/Footer";
import Profile from "./components/Profile.js";

import UserContext from "./lib/UserContext";
import FileContext from "./lib/FileContext";

const store = new EditoDb();
store.init();
window["edito"] = store;

export default function App() {
  // Users context for User Info
  const { users } = useContext(UserContext);
  const [user, setUser] = useState(users);

  const [activeFile,setActiveFile] = useState("");

  const { dir } = useContext(FileContext);
  const [directory, setDirectory] = useState(dir.children);

  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [userName,  setUserName] = useState("");
  
  const _setActiveFile = (file)=>{
    setActiveFile(file);
  }

  document.addEventListener("onSignUp", (e) => {
    // console.log("events",e);
  });

  useEffect(() => {
    setTimeout(async () => {
      let _res = await store.Users.getUsers();
      setUser([...user, ..._res]);
    }, 500);
  }, []);

  const onLogin = async (email)=>{
    const dir = await store.Directory.getUserFolder(email);
    const _userName = email.charAt(0).toUpperCase() + email.slice(1);
    console.log(_userName);
    setUserName(_userName);
    setDirectory(dir.children);
  }
  return (
    <>
      <FileContext.Provider value={{ dir: directory, setDirectory }}>
        <div className="flex flex-col justify-between h-screen w-full">
          <div className="shadow-md">
            <Navbar
              onToggleSidebar={() => setSidebarVisible(!isSidebarVisible)}
              onOpenSignup={() => {
                setSignupOpen(true);
              }}
              onOpenLogin={() => {
                setLoginOpen(true);
              }}
              userName = {userName}
            ></Navbar>
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-row h-full w-full">
              <div>
                <LeftSideBar isVisible={isSidebarVisible} directoryStore={store.Directory} activeFileData={_setActiveFile}></LeftSideBar>
              </div>
              <div className="relative h-full w-full">
                <MainBody openCode={""} activeFile={activeFile}></MainBody>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 h-12 w-full border">
            <Footer></Footer>
          </div>
        </div>
      </FileContext.Provider>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        {isSignupOpen && (
          <SignUp
            onCloseSignup={() => {
              setSignupOpen(false);
            }}
            userStore={store.Users}
            directoryStore={store.Directory}
          />
        )}
        {isLoginOpen && (
          <Login
            onCloseLogin={() => {
              setLoginOpen(false);
            }}
            onLogin={onLogin}

          />
        )}
      </UserContext.Provider>
    </>
  );
}
