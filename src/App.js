import EditoDb from "./storeDB"
import initialData from './data/data.json';
import { uuid } from "./lib/utility";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import MainBody from "./components/MainBody"
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const store = new EditoDb();
store.init();

export default function App() {

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState("");
  const [userLogo, setUserLogo] = useState({});
  const [data, setData] = useState([]);
  const [activeFolder, setActiveFolder] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          setTimeout(async () => {
            const user = await store.Users.getUserByEmail(email);
            if (user) {
              setLoggedIn(true);
              const firstLetter = email.charAt(0).toUpperCase();
              setUserLogo({ logo: firstLetter, color: user.color });
              const rootDir = await store.Directory.getUserFolder(email);
              const fileSystem = rootDir.root.children;
              setData(fileSystem);
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

  const handleFormSubmit = async (formData) => {
    formData.uuid = uuid();
    await store.Users.addUser(formData)
    const root = {
      uuid: formData.uuid,
      email: formData.email,
      root: {
        name: "Root",
        type: "folder",
        children: [
          {
            name: 'home',
            type: 'folder',
            children: [
              {
                name: 'edito.txt',
                type: 'file',
                size: '2 MB',
                created_at: "time"
              }
            ]
          }
        ]
      }
    }
    await store.Directory.addRoot(root)
  };

  const isSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
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
        const rootFolder = await store.Directory.getUserFolder(email);
        const fileSystem =  rootFolder.root.children || [];
        setData(fileSystem);
        setActiveFolder(fileSystem[0].name);
      }
      setStatus("email or password is invalid !!!")
    }
    setStatus("email or password is invalid !!!")
  }

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  }

  const handleFolderCreate = async () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      const newFolder = {
        type: 'folder',
        name: folderName,
        children: [],
      };

      // Try to find the active folder by name in the initial data
      const foundFolder = findFolderByName(initialData, activeFolder);

      // If found, add the new folder inside it; otherwise, create it at the top level
      if (foundFolder) {
        foundFolder.children.push(newFolder);
        setData([...initialData]); // Ensure to trigger a re-render
        const email = localStorage.getItem('email');
        await store.Directory.update(email, [...initialData]);
      } else {
        setData((prevStructure) => [...prevStructure, newFolder]);
      }
    }
  };

  const handleFileCreate = async () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const newFile = {
        type: 'file',
        name: fileName,
      };

      // Try to find the active folder by name in the initial data
      const foundFolder = findFolderByName(initialData, activeFolder);

      // If found, add the new file inside it; otherwise, create it at the top level
      if (foundFolder) {
        foundFolder.children.push(newFile);
        setData([...initialData]); // Ensure to trigger a re-render
        console.log([...initialData]);
       const email = localStorage.getItem('email');
       await store.Directory.update(email, [...initialData]);
      } else {
        setData((prevStructure) => [...prevStructure, newFile]);
      }
    }
  };

  // Helper function to find a folder by name in the data
  const findFolderByName = (data, folderName) => {
    for (const item of data) {
      if (item.type === 'folder' && item.name === folderName) {
        return item;
      }
      if (item.children) {
        const foundChild = findFolderByName(item.children, folderName);
        if (foundChild) {
          return foundChild;
        }
      }
    }
    return null;
  };


  const handleActiveFolder = (name) => {
    setActiveFolder(name);
  }
  return (
    <div className="flex flex-col justify-between h-screen w-full">
      <div className="shadow-md">
        <Navbar onToggleLeftSidebar={isOpen} onSignUpOpen={isSignUp} onLoginOpen={isLoginOpens} isLoggedIn={isLoggedIn} userLogo={userLogo} logout={logout}></Navbar>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-row h-full w-full">
          <div>
            <LeftSideBar isOpen={isLeftSidebarOpen} data={data} onFolderCreate={handleFolderCreate} onFileCreate={handleFileCreate} activeFolder={handleActiveFolder}></LeftSideBar>
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