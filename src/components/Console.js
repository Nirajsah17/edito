import React, { useRef, useEffect, useState, useContext } from 'react';
import {JsRuntime} from "../lib/jsRuntime.js";
import FileContext from "../lib/FileContext";

const Console = ({
    isTerminalOpen, fileStore
  }) => {
  const historyRef = useRef(null);
  const inputRef = useRef(null);
  const [useName, setUserName] = useState("");
  const [output, setOutput] = useState([]);
  const colorCode = {
    "Warning": "text-orange-400",
    "Error": "text-red-400",
    "Success": "text-green-400",
    "Syntax Error": "text-red-600"
  }
  const { dir, setDirectory } = useContext(FileContext);
  
  const jsrun = new JsRuntime();
  
  useEffect(() => {
    inputRef.current.focus();
     let _useName = localStorage.getItem("user");
     if(_useName){
      _useName = _useName.split("@")[0];
      setUserName(_useName);
     }
    
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
      try {
        const execute = new Function(fileData);
        let consoleOutput = [];
        console.log = (message) => {
           if (typeof message === 'object') {
             consoleOutput.push(`Success: \n${JSON.stringify(message, null, 2)} \n`);
           } else {
             consoleOutput.push(`Success: ${message} \n`);
           }
        };
        console.warn = (message) => {
          consoleOutput.push(`Warning: ${message} \n`);
        };
        console.error = (message) => {
          consoleOutput.push(`Error: ${message} \n`);
        };
        execute();
        setOutput(consoleOutput);
      } catch (error) {
        setOutput(`Syntax Error: ${error.message}`);
      }
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
     output.map((message, index) => {
       const log = document.createElement('div');
       log.setAttribute("className", `text-xs ${colorCode[message.split(":")[0]]}`);
      //  log.innerHTML = `<pre key={index} className=${colorCode[message.split(":")[0]]}>${message.split(":")[1]}</pre>`;
       log.textContent = " " + message.split(":")[1];
       historyRef.current.appendChild(log);
     });
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
    <div style={{ display: isTerminalOpen ? "block" : "none" }} className="absolute bottom-0 w-full">
    < div className = "terminal-container scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin" >
       
      <div id="history" ref={historyRef}></div>
     <div className="text-xs">
         {output && output.map((message, index) => (
    <pre key={index} className={colorCode[message.split(":")[0]]}>{message.split(":")[1]}</pre>
  ))}
      </div>
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
    </div>
  );
};

export default Console;
