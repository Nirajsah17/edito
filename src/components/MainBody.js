import { useEffect, useRef, useState } from "react";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '../custom.css';


function MainBody({currentCode}) {
  const [text, setText] = useState("");
  const code = useRef(null);
  const editing = useRef(null);
  const higthlightingRef = useRef(null);
  // const [lineNumbers, setLineNumbers] = useState([]);

  const syncScroll = (e) => {
    if(higthlightingRef.current){
      const element = e.target;
      higthlightingRef.current.scrollTop = element.scrollTop;
      higthlightingRef.current.scrollLeft = element.scrollLeft;
      // updateLineNumbers();
    }
  }
  
  const handleText = (e) => {
    const newText = e.target.value;
    // For new line 
    newText.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    setText(newText);
    currentCode(newText);
    code.current.scrollTop = editing.current.scrollTop;
    code.current.scrollLeft = editing.current.scrollLeft;
  };
  
  // const updateLineNumbers = () => {
  //   if (editing.current) {
  //     const lines = editing.current.value.split('\n');
  //     setLineNumbers(Array.from({
  //       length: lines.length
  //     }, (_, index) => index + 1));
  //   }
  // };
  
  // useEffect(() => {
  //   updateLineNumbers();
  // }, [editing.current]);
  
  useEffect(() => {
    Prism.highlightAll();
  }, [text]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); 
      document.execCommand('insertText', false, '  '); 
    }
  };
  
  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* <div className="line-numbers">
        {lineNumbers.map((lineNumber) => (
          <div key={lineNumber} className="h-2">{lineNumber}</div>
        ))}
      </div> */}
        <textarea id="editing" spellCheck="false" ref={editing}
          onChange={handleText}
          value={text}
          onInput={syncScroll}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
        ></textarea>
        <pre ref={higthlightingRef} id="highlighting" aria-hidden="true">
          <code className="language-javascript" ref={code}>
           {text}
          </code>
        </pre>
      </div>
    </>
  );
}

export default MainBody;
export { MainBody };
