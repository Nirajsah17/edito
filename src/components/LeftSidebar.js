import folder from "./images/folder.svg";
import file from "./images/file.svg";
import Folder from "./Folder";
import File from "./File";
import Menu from "./Menu";
import { useState, useContext } from "react";
import FileContext from "../lib/FileContext";

export default function LeftSideBar({ isVisible }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState();
  const [activeFile, setActiveFile] = useState();

  const handleMenu = () => {
    setIsMenuOpen(false);
  };
  const onFolderCreate = () => { };
  const onFileCreate = () => { };
  const eventHandler = (e) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setIsMenuOpen(true);

  };

  const handleActiveItem = (e) => {
    const _activeFolder = e.target.dataset.folder;
    const _activeFile = e.target.dataset.file;

    if(_activeFolder){
      setActiveFolder(_activeFolder);

    }
    if(_activeFile){
      setActiveFile(_activeFile);
    }

  }
  const { dir, setDirectory } = useContext(FileContext);

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
        <div onClick={handleActiveItem} onContextMenu={eventHandler} className="w-full overflow-y-auto">
          {dir.map(renderNode)}
        </div>
      </div>
      <div>
        {isMenuOpen && (
          <Menu position={position} />
        )
        }
      </div>
    </div>
  );
}
