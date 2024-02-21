import { useEffect, useRef, useState } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "../custom.css";
import { Tabs } from "./Tab";
import Console from "./Console";

function MainBody({ openCode, activeFile, setActiveFile, fileStore }) {

  const [text, setText] = useState("");
  const code = useRef(null);
  const editing = useRef(null);
  const higthlightingRef = useRef(null);
  const [is_console_open, set_is_console_open] = useState(false);
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
      const obj = await fileStore.getFile(activeFile?.id);

      if (obj) {
        setText(obj.content);

      }
      // console.log(obj);
    }, 10);
  }, [activeFile]);

  const _handleKeyDown = (e) => {
    const ctrl = e.ctrlKey;
    const key = e.which;
    if (ctrl) {
      if (ctrl && e.which == 83) {
        e.preventDefault();
        set_is_console_open(!is_console_open);
        saveFile(activeFile.id, text);
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
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <Tabs activeFile={activeFile} setActiveFile={setActiveFile} />
        </div>
        <div className="relative flex flex-1">
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
          <pre
            ref={higthlightingRef}
            id="highlighting"
            aria-hidden="true"
            className="scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin"
          >
            <code
              className="language-javascript scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin"
              ref={code}
            >
              {openCode ? openCode : text}
            </code>
          </pre>
        </div>
      {is_console_open ? <Console></Console> : ''}
      </div>
    </>
  );
}

export default MainBody;
export { MainBody };
