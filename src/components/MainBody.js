import { useEffect, useRef, useState } from "react";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '../custom.css';


function MainBody({ currentCode, openCode }) {
  
  const [text, setText] = useState("");
  const code = useRef(null);
  const editing = useRef(null);
  const higthlightingRef = useRef(null);
  // const [lineNumbers, setLineNumbers] = useState([]);

  const syncScroll = (e) => {
    // if (higthlightingRef.current) {
    //   const element = e.target;
    //   higthlightingRef.current.scrollTop = element.scrollTop;
    //   higthlightingRef.current.scrollLeft = element.scrollLeft;
    //   // updateLineNumbers();
    // }
  }


  // setText(openCode)

  const handleText = (e) => {
    // const newText = e.target.value;
    // // For new line 
    // newText.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    // setText(newText);
    // currentCode(newText);
    // code.current.scrollTop = editing.current.scrollTop;
    // code.current.scrollLeft = editing.current.scrollLeft;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [text, openCode]);

  const handleKeyDown = (e) => {
    // if (e.key === 'Tab') {
    //   e.preventDefault();
    //   document.execCommand('insertText', false, '  ');
    // }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <textarea id="editing" spellCheck="false" ref={editing}
          onChange={handleText}
          // value={openCode ? openCode : text}
          onInput={syncScroll}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
        ></textarea>
        <pre ref={higthlightingRef} id="highlighting" aria-hidden="true">
          <code className="language-javascript" ref={code}>
            {/* {openCode ? openCode : text} */}
          </code>
        </pre>
      </div>
    </>
  );
}

export default MainBody;
export { MainBody };
