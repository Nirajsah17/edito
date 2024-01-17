import folder from './images/folder.svg';
import file from './images/file.svg';
import Folder from './Folder';
import File from './File';
import Menu from './Menu';
import { useState, useContext } from 'react';
import FileContext from '../lib/FileContext';

export default function LeftSideBar({ directory, isOpen, onFolderCreate, onFileCreate, deleted, openFileInCode }) {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFolderInput, setFolderInput] = useState(false);
  const [isFileInput, setFileInput] = useState(false);
  const [activeFileAndFolder, setActiveFileAndFolder] = useState({ folder: 'home' });
   const {dir} = useContext(FileContext);
  console.log(dir);
  const createFileOrFolder = (obj) => {
    const action = obj.action;
    const type = obj.type;
    if (action == "create") {
      switch (type) {
        case "file":
          setFileInput(true);
          break;
        case "folder":
          setFolderInput(true);
          break;
      }
    }
    if (action == "delete") {
      deleted(activeFileAndFolder);
    }
  }

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

  const handleActive = (tag) => {
    const folderName = tag.getAttribute('data-folder');
    if (folderName) {
      setActiveFileAndFolder({ folder: folderName });
    } else {
      const file = tag.getAttribute('data-file');
      setActiveFileAndFolder({ file: file });
      openFileInCode(file);
    }
  }

  const eventHandler = (e) => {
    e.preventDefault();
    if (e.type === "click") {
      // if (e.target.tagName == "INPUT") return;
      setMenuOpen(false);
      handleActive(e.target);
      // setFolderInput(false);
    } else if (e.type === 'contextmenu') {
      const position = { x: e.clclientX, y: e.clientY };
      setPosition(position);
      setMenuOpen(true);
    }
  }

  const handleMenu = (e) => {
    setMenuOpen(false);
    if (e.target.tagName == "INPUT") return;
    // console.log("handle menu");
    // setFolderInput(false);
  }

  const handleKeyDownFolder = (e) => {
    if (e.key == "Enter") {
      const input = e.target.value;
      setFolderInput(false);
      onFolderCreate(input, activeFileAndFolder);
    }
  }

  const handleKeyDownFile = (e) => {
    if (e.key == "Enter") {
      const input = e.target.value;
      console.log({ input });
      setFileInput(false);
      onFileCreate(input, activeFileAndFolder)
    }
  }

  return (
    isOpen ?
      <div onClick={handleMenu} className="flex flex-col bg-gray-50 w-60 h-full border-r items-center">
        <div className="flex w-full bg-gray-100 h-9 border-b justify-between items-center">
          <div className="p-2 truncate text-gray-500"><b>Home</b></div>
          <div className="flex">
            <div className="p-2">
              <img onClick={onFolderCreate} className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={folder} height={24} width={24}></img>
            </div>
            <div className="p-2">
              <img onClick={onFileCreate} className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={file} height={24} width={24}></img>
            </div>
          </div>
        </div>
        <div onClick={eventHandler} onContextMenu={eventHandler} className="w-full overflow-y-auto">{directory.map(renderNode)}
        </div>
        {isMenuOpen ?
          <Menu position={position} createFileOrFolder={createFileOrFolder}></Menu>
          : ''
        }
        {isFolderInput ? <input onKeyDown={handleKeyDownFolder} className='p-1 ml-8 bg-gray-300 ' type='text' /> : ''}
        {isFileInput ? <input onKeyDown={handleKeyDownFile} className='p-1 ml-8 bg-gray-300 ' type='text' /> : ''}

      </div> : ''
  )
}