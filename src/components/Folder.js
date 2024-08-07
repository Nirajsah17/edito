import React, { useState } from 'react';

const Folder = ({ name, children , uuid, activeFolder}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={uuid === activeFolder ? " px-0.5 border  cursor-pointer bg-bg-overlay": "px-0.5 cursor-pointer hover:bg-bg-default"} onClick={toggleFolder} data-folder={uuid} data-name={name} title={name}>
        {isOpen ? <button className="p-1 cursor-pointer">
      <svg width="12px" height="12px" viewBox="0 0 1024 1024" className="text-fg-default" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path data-folder={uuid} d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path>
        </g>
      </svg>
    </button> :  <button>
      <svg width="12px" height="12px" viewBox="0 0 1024 1024" className="text-fg-default" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="" stroke="bg-bg-default" strokeWidth="0.01024">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path data-folder={uuid} d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill=""></path>
        </g>
      </svg>
    </button>}
       <span className="text-md text-fg-default" data-folder={uuid} data-name={name} title={name}> {name}</span>
      </div>
      {isOpen && <div className="ml-4 text-sm text-fg-default">{children}</div>}
    </div>
  );
};

export default Folder;
