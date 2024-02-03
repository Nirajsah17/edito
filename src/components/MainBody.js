import { useEffect, useRef, useState } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "../custom.css";

function MainBody({ openCode, activeFile, fileStore }) {
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

  const saveFile = (filename, content) => {
    console.log({ filename, content });
    setTimeout(async () => {
      if (fileStore) {
        await fileStore.updateFile(filename, content);
      }
    }, 200);
  };

  useEffect(()=>{
    setTimeout(async ()=>{
      if(!fileStore) return;
      const obj = await fileStore.getFile(activeFile);
      if(obj){
        setText(obj.content)
      }
      // console.log(obj);
    },10)
    
  },[activeFile]);

  const _handleKeyDown = (e) => {
    const ctrl = e.ctrlKey;
    const key = e.which;
    if (ctrl) {
      if (ctrl && e.which == 83) {
        e.preventDefault();
        saveFile(activeFile, text);
      }
    }
  };

  document.addEventListener("keydown", _handleKeyDown);

  const handleText = (e) => {
    const newText = e.target.value;
    renderFn(newText);
  };
  const renderFn = (text) => {
    text.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    setText(text);
    code.current.scrollTop = editing.current.scrollTop;
    code.current.scrollLeft = editing.current.scrollLeft;
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
