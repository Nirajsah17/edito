import React, { useRef, useEffect, useState, useContext } from 'react';
import {JsRuntime} from "../lib/jsRuntime.js";
import FileContext from "../lib/FileContext";

const Console = ({fileStore}) => {
  const historyRef = useRef(null);
  const inputRef = useRef(null);
  const [useName, setUserName] = useState("");
  const { dir, setDirectory } = useContext(FileContext);
  
  const jsrun = new JsRuntime();
  
  useEffect(() => {
    inputRef.current.focus();
     let _useName = localStorage.getItem("user");
     _useName = _useName.split("@")[0];
     setUserName(_useName);
  }, []);
  
  function findUuidByName(data, name) {
    for (let item of data) {
      if (item.name === name) {
        return item.uuid;
      }
      if (item.type === "folder" && item.children) {
        const uuid = findUuidByName(item.children, name);
        if (uuid) {
          return uuid;
        }
      }
    }
    return null;
  }

  const handleFileExuction = async (filename) => {
    const uuid = findUuidByName(dir, filename);
    if(!uuid){
      console.error("File Not Found!!");
    }else{
      const obj = await fileStore.getFile(uuid);
      const fileData = obj.content;
      console.log(fileData);
      const res = await jsrun.run(fileData);
      console.log(res);
    }
  }

  const handleInputChange = () => {
    const inputText = inputRef.current.textContent.trim();
    if (inputText.endsWith('\n')) {
      handleCommand(inputText);
      inputRef.current.textContent = '';
    }
  };

  const handleCommand = (command) => {
    const line = document.createElement('div');
    line.textContent = `$ ${useName}: ${command}`;
    historyRef.current.appendChild(line);
    console.log(command);
    handleFileExuction(command);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputRef.current.textContent.trim());
      inputRef.current.textContent = '';
      console.log('enter');
    }
  };
  
  return (
    <div className="terminal-container">
      <div id="history" ref={historyRef}></div>
      <span className="font-bold">$ {useName}: </span>
      <span
        id="input"
        contentEditable="true"
        ref={inputRef}
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
      ></span>
      <button id="caret" onClick={() => inputRef.current.focus()}>&nbsp;</button>
    </div>
  );
};

export default Console;
