import folder from './images/folder.svg';
import file from './images/file.svg';
import Folder from './Folder';
import File from './File';
import Menu from './Menu';
import { useState } from 'react';

export default function LeftSideBar({ data, isOpen, onFolderCreate, onFileCreate, activeFolder }) {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFolderInput, setFolderInput] = useState(false);
  const [activeFileAndFolder, setActiveFileAndFolder] = useState({ folder: 'home', file: null });

  const createFileOrFolder = () => {
    setFolderInput(true);
  }

  const renderNode = (node) => {
    if (node.type === 'folder') {
      return (
        <Folder key={node.name} name={node.name} activeFolder={activeFolder}>
          {node.children.map(renderNode)}
        </Folder>
      );
    } else if (node.type === 'file') {
      return <File key={node.name} name={node.name} />;
    }
    return null;
  };

  const handleActive = (tag) => {
    const folderName = tag.getAttribute('data-folder');
    if (folderName) {
      activeFileAndFolder.folder = folderName;
      setActiveFileAndFolder({ ...activeFileAndFolder });
    } else {
      const file = tag.getAttribute('data-file');
      activeFileAndFolder.file = file;
      setActiveFileAndFolder({ ...activeFileAndFolder });
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
    console.log("handle menu");
    // setFolderInput(false);
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
        <div onClick={eventHandler} onContextMenu={eventHandler} className="w-full overflow-y-auto">{data.map(renderNode)}
        </div>
        {isMenuOpen ?
          <Menu position={position} createFileOrFolder={createFileOrFolder}></Menu>
          : ''
        }
        {isFolderInput ? <input className='p-1 ml-8 bg-gray-300 ' type='text' /> : ''}

      </div> : ''
  )
}