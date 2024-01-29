import { useEffect, useRef, useState } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "../custom.css";

function MainBody({ openCode, activeFile }) {
  const [text, setText] = useState("");
  const code = useRef(null);
  const editing = useRef(null);
  const higthlightingRef = useRef(null);
  const syncScroll = (e) => {
    if (higthlightingRef.current) {
      const element = e.target;
      higthlightingRef.current.scrollTop = element.scrollTop;
      higthlightingRef.current.scrollLeft = element.scrollLeft;
    }
  };

  const handleText = (e) => {
    const newText = e.target.value;
    renderFn(newText);
  };
  const renderFn = (text) => {
    text
      .replace(new RegExp("&", "g"), "&")
      .replace(new RegExp("<", "g"), "<");
    setText(text);
    code.current.scrollTop = editing.current.scrollTop;
    code.current.scrollLeft = editing.current.scrollLeft;
    console.log(activeFile);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [text, openCode]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "  ");
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <textarea
          id="editing"
          spellCheck="false"
          ref={editing}
          onChange={handleText}
          value={openCode ? openCode : text}
          onInput={syncScroll}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
        ></textarea>
        <pre ref={higthlightingRef} id="highlighting" aria-hidden="true">
          <code className="language-javascript" ref={code}>
            {openCode ? openCode : text}
          </code>
        </pre>
      </div>
    </>
  );
}

export default MainBody;
export { MainBody };
