import { useEffect, useRef, useState } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "../custom.css";
import { Tabs } from "./tab";

function MainBody({ openCode, activeFileObj, fileStore }) {

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

  useEffect(() => {
    setTimeout(async () => {
      if (!fileStore) return;
      const obj = await fileStore.getFile(activeFileObj.id);

      if (obj) {
        setText(obj.content);

      }
      // console.log(obj);
    }, 10);
  }, [activeFileObj]);

  const _handleKeyDown = (e) => {
    const ctrl = e.ctrlKey;
    const key = e.which;
    if (ctrl) {
      if (ctrl && e.which == 83) {
        e.preventDefault();
        saveFile(activeFileObj.id, text);
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
      <Tabs activeFileObj={activeFileObj}/>
        <textarea
          id="editing"
          spellCheck="false"
          ref={editing}
          onChange={handleText}
          value={openCode ? openCode : text}
          onInput={syncScroll}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown} 
          className="scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin"
        ></textarea>
        <pre ref={higthlightingRef} id="highlighting" aria-hidden="true" className="scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin">
          <code className="language-javascript scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin" ref={code}>
            {openCode ? openCode : text}
          </code>
        </pre>
      </div>
    </>
  );
}

export default MainBody;
export { MainBody };
