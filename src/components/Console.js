import { useEffect, useState } from "react";


export default function Console (){
  let [userName,setUserName] = useState("");
  useEffect(()=>{
    let user = localStorage.getItem("user")
    console.log(user);
    setUserName(user)
  },[]);
  
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');

  const handleCommand = () => {
    if (input.trim() !== '') {
      setHistory(prevHistory => [...prevHistory, input]);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
   return (
   <div className="terminal-container">
      <div className="terminal">
        <div className="history">
          {history.map((command, index) => (
            <div key={index} className="command-line">
              <span className="prompt">C:\WIKIPEDIA &gt; </span>
              {command}
            </div>
          ))}
        </div>
        <div className="input-line">
          <span className="prompt">C:\WIKIPEDIA &gt; </span>
          <input
            type="text"
            className="input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand();
            }}
          />
          <button className="caret" onClick={handleCommand}></button>
        </div>
      </div>
    </div>
  );
}