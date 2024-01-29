import folder from "./images/folder.svg";
import file from "./images/file.svg";
import Folder from "./Folder";
import File from "./File";
import Menu from "./Menu";
import { useState, useContext } from "react";
import FileContext from "../lib/FileContext";

export default function LeftSideBar({ isVisible }) {
  const { dir, setDirectory } = useContext(FileContext);
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState();
  const [activeFile, setActiveFile] = useState();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleMenu = () => {
    setIsMenuOpen(false);
  };
  const onFolderCreate = () => { };
  const onFileCreate = () => { };
  const contextMenuHandler = (e) => {
    e.preventDefault();
    const xPos = e.clientX + window.scrollX;
    const yPos = e.clientY + window.scrollY;

    setPosition({
      x: xPos,
      y: yPos
    });
    setIsMenuOpen(true);
  };

  const handleActiveItem = (e) => {
    const _activeFolder = e.target.dataset.folder;
    const _activeFile = e.target.dataset.file;

    if(_activeFolder){
      setActiveFolder(_activeFolder);
      console.log(_activeFolder);
    }
    if(_activeFile){
      setActiveFile(_activeFile);
    }
  }
  
  const handleMenuItem = (e) => {
    const menuItem = e.target.id;
    if (!menuItem) return;
    setIsMenuOpen(false);
     switch (menuItem) {
       case "newFile":
          setIsInputVisible(true);
          console.log(inputValue);
         break;
       case "newFolder":
          setIsInputVisible(true);
         break;
       case "cut":
          setIsInputVisible(true);
         break;
       case "copy":
          setIsInputVisible(true);
         break;
       case "rename":
          setIsInputVisible(true);
         break;
       case "delete":
          setIsInputVisible(true);
         break;

       default:
         break;
     }
  };
  
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInputValue(e.target.value);
      setIsInputVisible(false);
    }
  };
  

  const renderNode = (node) => {
    if (node.type === 'folder') {
      return (
        <Folder key={node.name} name={node.name} uuid={node.uuid}>
          {node.children.map(renderNode)}
        </Folder>
      );
    } else if (node.type === 'file') {
      return <File key={node.name} name={node.name} uuid={node.uuid} />;
    }
    return null;
  };
  
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <div
        onClick={handleMenu} className="flex flex-col bg-gray-50 w-60 h-full border-r items-center">
        <div className="flex w-full bg-gray-100 h-9 border-b justify-between items-center">
          <div className="p-2 truncate text-gray-500">
            <b>Home</b>
          </div>
          <div className="flex">
            <div className="p-2">
              <img onClick={onFolderCreate} className="cursor-pointer hover:bg-gray-300 hover:rounded-md" src={folder} height={24} width={24}></img>
            </div>
            <div className="p-2">
              <img onClick={onFileCreate} className="cursor-pointer hover:bg-gray-300 hover:rounded-md" src={file} height={24} width={24}></img>
            </div>
          </div>
        </div>
        <div onClick={handleActiveItem} onContextMenu={contextMenuHandler} className="w-full overflow-y-auto">
          {dir.map(renderNode)}
        </div>
      </div>
        {isMenuOpen && (
          <Menu position={position} onMenuItemClick={handleMenuItem}/>
        )
        }
      {isInputVisible && (
        <input
          type="text"
          placeholder="Enter folder name"
          onKeyDown={handleInputKeyDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
    </div>
  );
}
