import EditoDb from "./storeDB";
import initialData from "./data/data.json";
import { uuid } from "./lib/utility";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSidebar";
import MainBody from "./components/MainBody";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Sender from "./components/Sender";
import Receiver from "./components/Receiver";
import { deleteByName } from "./lib/utility";

import UserContext from "./components/context";

const store = new EditoDb();
store.init();
window["edito"] = store;

export default function App() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState("");
  const [userLogo, setUserLogo] = useState({});
  const [directory, setDirectory] = useState([]);
  const [activeFolder, setActiveFolder] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [openCode, setCode] = useState("");
  const [user,setUser] = useState("")
  let codes = null;
  let activeFile = null;

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const fetchData = () => {
      const email = localStorage.getItem("email");
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
              setDirectory(fileSystem);
            }
          }, 1);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchData();
  }, [store.Users]);

  const isOpen = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const isLoginOpens = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleFormSubmit = async (formData) => {
    const _uuid = uuid();
    formData.uuid = _uuid;
    activeFile = _uuid;
    await store.Users.addUser(formData);
    const root = {
      uuid: formData.uuid,
      email: formData.email,
      root: {
        name: "Root",
        type: "folder",
        children: [
          {
            name: "home",
            type: "folder",
            children: [
              {
                name: "edito.txt",
                type: "file",
                size: "2 MB",
                created_at: "time",
                uuid: _uuid,
              },
            ],
          },
        ],
      },
    };
    await store.Directory.addRoot(root);

    const _obj = {
      email: localStorage.getItem("email"),
      uuid: _uuid,
      content: "No content",
    };
    await store.File.addFile(_obj);
  };

  const isSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
  };

  const loginUser = async (user) => {
    const email = user.email;
    const password = user.password;
    const userObj = await store.Users.getUserByEmail(email);
    if (userObj) {
      if (userObj.password == password) {
        setLoginOpen(false);
        setLoggedIn(true);
        const firstLetter = email.charAt(0).toUpperCase();
        const color = userObj.color;
        setUserLogo({ logo: firstLetter, color: color });
        localStorage.setItem("email", email);
        const rootFolder = await store.Directory.getUserFolder(email);
        const fileSystem = rootFolder.root.children || [];
        setDirectory(fileSystem);
        setUser(email);
        // setActiveFolder(fileSystem[0].name);
      }
      setStatus("email or password is invalid !!!");
    }
    setStatus("email or password is invalid !!!");
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const handleFolderCreate = async (file, folder) => {
    const activeFolder = folder.folder;
    const folderName = file;
    if (folderName) {
      const newFolder = {
        type: "folder",
        name: folderName,
        children: [],
        uuid: uuid(),
      };
      // Try to find the active folder by name in the initial data
      const foundFolder = findFolderByName(directory, activeFolder);
      //   // If found, add the new folder inside it; otherwise, create it at the top level
      if (foundFolder) {
        foundFolder.children.push(newFolder);
        const email = localStorage.getItem("email");
        await store.Directory.update(email, [...directory]);
      } else {
        setDirectory((prevStructure) => [...prevStructure, newFolder]);
      }
    }
  };

  const handleFileCreate = async (file, folder) => {
    console.log({ file, folder });
    const fileName = file;
    const activeFolder = folder.folder;
    if (fileName) {
      const newFile = {
        type: "file",
        name: fileName,
        uuid: uuid(),
        content: "No content",
      };
      const foundFolder = findFolderByName(directory, activeFolder);
      if (foundFolder) {
        foundFolder.children.push(newFile);
        const email = localStorage.getItem("email");
        await store.Directory.update(email, [...directory]);
      } else {
        setDirectory((prevStructure) => [...prevStructure, newFile]);
      }
    }
  };

  // Helper function to find a folder by name in the data
  const findFolderByName = (data, folderName) => {
    for (const item of data) {
      if (item.type === "folder" && item.name === folderName) {
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
  };

  const handleDelete = (obj) => {
    console.log(directory);
    let deleteItem = null;
    if (obj.folder) {
      deleteItem = obj.folder;
    } else {
      deleteItem = obj.file;
    }
    if (deleteItem === "home")
      return alert(
        "Can't delete root directory, please select valid file or folder"
      );
    deleteByName(directory, deleteItem);
    setDirectory(directory);
  };

  const openFileInCode = async (filename) => {
    if (filename) {
      activeFile = filename;
      console.log("open :: ", filename);
      const file = await store.File.getFile(filename);
      if (file) {
        setCode(file.content);
      }
      // setActiveFolder();
    }
    // if(filename.folder){
    // setActiveFolder(filename.folder)
    // }
  };

  const saveHandle = async () => {
    const code = JSON.stringify(codes);
    console.log(activeFile);
    const file = await store.File.getFile(activeFile);
    if (file) {
      store.File.updateFile(activeFile, code);
    } else {
      const _obj = {
        email: localStorage.getItem("email"),
        uuid: activeFile,
        content: code,
      };
      await store.File.addFile(_obj);
    }
  };

  const currentCode = (code) => {
    codes = code;
  };

  return (
    <UserContext.Provider value={{user,setUser}}>
      <div className="flex flex-col justify-between h-screen w-full">
        <div className="shadow-md">
          <Navbar
            onToggleLeftSidebar={isOpen}
            onSignUpOpen={isSignUp}
            onLoginOpen={isLoginOpens}
            isLoggedIn={isLoggedIn}
            userLogo={userLogo}
            logout={logout}
          ></Navbar>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-row h-full w-full">
            <div>
              <LeftSideBar
                isOpen={isLeftSidebarOpen}
                directory={directory}
                onFolderCreate={handleFolderCreate}
                onFileCreate={handleFileCreate}
                deleted={handleDelete}
                openFileInCode={openFileInCode}
              ></LeftSideBar>
            </div>
            <div className="relative h-full w-full">
              {isSignUpOpen ? (
                <div className="absolute z-50">
                  <SignUp
                    onSignUpOpen={isSignUp}
                    onSubmit={handleFormSubmit}
                  ></SignUp>{" "}
                </div>
              ) : (
                ""
              )}
              {isLoginOpen ? (
                <div className="absolute z-50">
                  <Login
                    onLoginOpen={isLoginOpens}
                    onLogin={loginUser}
                    error={status}
                  ></Login>
                </div>
              ) : (
                ""
              )}
              {/* <div className="absolute z-50" >
                <Sender />
              </div> */}
              <MainBody
                currentCode={currentCode}
                openCode={openCode}
              ></MainBody>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 h-12 w-full border">
          <Footer saveHandle={saveHandle}></Footer>
        </div>
      </div>
    </UserContext.Provider>
  );
}
