import React, { useState } from 'react';

const Folder = ({ name, children, activeFolder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sendDataToGrandparent = (e) => {
   activeFolder(name);
  };
  
  const toggleFolder = (e) => {
    setIsOpen(!isOpen);
    sendDataToGrandparent(e)
  };
  const folderClassName = isOpen ? 'border border-purple-300' : '';
  return (
    <div>
      <div className={`cursor-pointer ${folderClassName} bg-gray-200`} onClick={toggleFolder}>
        {isOpen ? <button className="p-1 cursor-pointer">
      <svg width="12px" height="12px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path>
        </g>
      </svg>
    </button> :  <button>
      <svg width="12px" height="12px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" strokeWidth="0.01024">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"></path>
        </g>
      </svg>
    </button>}
       <span className="text-md text-gray-500"> {name}</span>
      </div>
      {isOpen && <div className="ml-4 text-md text-gray-500">{children}</div>}
    </div>
  );
};

export default Folder;
