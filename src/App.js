import EditoDb from "./storeDB"
import initialData from './data/data.json';
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import MainBody from "./components/MainBody"
import SignUp from "./components/SignUp";
import Login from "./components/Login";

// const store = new Store();
const store = new EditoDb();
store.init();

// store.Users.addUser();
// store.Director.get();


export default function App() {

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState("");
  const [userLogo, setUserLogo] = useState({});
  const [data, setData] = useState(initialData);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    const fetchData =  () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          setTimeout(async () => {
            console.log(store);
            const user =  await store.Users.getUserByEmail(email);
            if (user) {
              setLoggedIn(true);
              const firstLetter = email.charAt(0).toUpperCase();
              setUserLogo({ logo: firstLetter, color: user.color });
            }
          }, 1)

        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    
    fetchData();
  }, [store.Users]);

  
  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  }

  const isLoginOpens = () => {
    setLoginOpen(!isLoginOpen);
  }

  const handleFormSubmit = (formData) => {
    store.Users.addUser(formData)
  };

  const isSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
    console.log(isSignUpOpen);
  }

  const loginUser = async (user) => {
    const email = user.email;
    const password = user.password;
    const userObj = await store.Users.getUserByEmail(email);
    if (userObj) {
      if (userObj.password == password) {
        setLoginOpen(false)
        setLoggedIn(true);
        const firstLetter = email.charAt(0).toUpperCase();
        const color = userObj.color;
        setUserLogo({ logo: firstLetter, color: color });
        localStorage.setItem("email", email);
      }
      setStatus("email or password is invalid !!!")
    }
    setStatus("email or password is invalid !!!")
  }

  const logout = ()=>{
    localStorage.clear();
    setLoggedIn(false);
  }

  const handleFolderCreate = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      setData((prevData) => [
        ...prevData,
        {
          type: 'folder',
          name: folderName,
          children: [],
        },
      ]);
    }
  };

  const handleFileCreate = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      setData((prevData) => [
        ...prevData,
        {
          type: 'file',
          name: fileName,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div className="shadow-md">
        <Navbar onToggleLeftSidebar={isOpen} onSignUpOpen={isSignUp} onLoginOpen={isLoginOpens} isLoggedIn={isLoggedIn} userLogo={userLogo} logout={logout}></Navbar>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-row h-full w-full">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen} data={data} onFolderCreate={handleFolderCreate} onFileCreate={handleFileCreate}></LeftSideBar>
          </div>
          <div className="relative h-full w-full">
            {isSignUpOpen ?
              <div className="absolute z-50">
                <SignUp onSignUpOpen={isSignUp} onSubmit={handleFormSubmit}></SignUp> </div> : ''}
            {isLoginOpen ?
              <div className="absolute z-50" >
                <Login onLoginOpen={isLoginOpens} onLogin={loginUser} error={status}></Login></div> : ''}
            <MainBody></MainBody>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-gray-50 justify-center h-12 w-full border">footer</div>
    </div>
  )
}