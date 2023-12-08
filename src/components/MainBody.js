import { useEffect, useRef, useState } from "react";
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';
import '../custom.css';

function MainBody({}) {
  const [text, setText] = useState("");
  const code = useRef(null);
  const editing = useRef(null);

  const syncScroll = () => {
    code.current.scrollTop = editing.current.scrollTop;
    code.current.scrollLeft = editing.current.scrollLeft;
    console.log(editing.current.scrollTop);
  }

  const handleText = (e) => {
    const newText = e.target.value;
    // For new line 
    newText.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    setText(newText);
    code.current.scrollTop = editing.current.scrollTop;
    code.current.scrollLeft = editing.current.scrollLeft;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [text]);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="w-6 p-2 border-r h-full overflow-y-auto">1.</div>
        <textarea id="editing" spellCheck="false" ref={editing}
          onChange={handleText}
          value={text}
          onScroll={syncScroll}
        ></textarea>
        <pre id="highlighting" aria-hidden="true">
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
