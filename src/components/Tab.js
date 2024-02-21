import { useEffect, useState } from "react";
import symbol from "../data/symbol.json";
import { tab } from "@testing-library/user-event/dist/tab";

function Tabs({ activeFile, setActiveFile }) {
  const _tabs = [{
    id: "asdljsvhflc",
    name: "edito.txt"
  }];
  const [tabList, setTabList] = useState(_tabs);

  useEffect(() => {
    if (!activeFile?.name) return; 
    if (!tabList.some(tab => tab.id === activeFile.id)) { 
      setTabList(prevTabList => [...prevTabList, activeFile]); 
    }
  }, [activeFile]);

const handleDeleteTab = (e) => {
  const id = e.target.dataset.id;
  const index = tabList.findIndex(tab => tab.id === id);
  if (index > -1) {
    const deletedTab = tabList[index];
    tabList.splice(index, 1);
    const nextTab = tabList[index] || tabList[index - 1];
    if (activeFile && activeFile.id !== id) {
      console.log("Deleted file:", deletedTab);
    }
    if (activeFile && activeFile.id === id) {
      setActiveFile(nextTab ? { id: nextTab.id, name: nextTab.name } : null);
    }
    setTabList([...tabList]);
  }
  if (tabList.length === 0) {
    setActiveFile(null);
  }
};

const handleEventDelegation = (e) => {
  const id = e.target.dataset.id;
  const action = e.target.classList.contains("tab-delete-button") ? "delete" : "activate";
    if (action === "delete") {
      handleDeleteTab(e);
    } else {
      const parentNode = e.target.parentNode;
      const id = parentNode.dataset.id;
      const name = parentNode.dataset.name;
      setActiveFile({id: id, name: name})
    }
};

return (
  <div
    className = "w-full flex top-0 left-0 z-10 overflow-x-auto whitespace-no-wrap scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin text-gray-500"
    key={"tabs"}
    onClick = {
      handleEventDelegation
    }
  >
    {tabList.map((tab) => (
      <div key={tab.id} data-id={tab.id} data-name={tab.name} className={tab.id === activeFile.id ? "p-1 border-r-2 bg-black cursor-pointer" : "p-1 border-r-2 cursor-pointer"}>
        <span className="p-0.5">{tab.name}</span>
        <span>
          <button
            key={`${tab.id}-close`}
            data-name={tab.name}
            data-id={tab.id}
            type="button"
            className="tab-delete-button end-2.5 ms-auto inline-flex h-5 w-5 items-center justify-center rounded bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg><span className="sr-only">Close modal</span>
          </button>
        </span>
      </div>
    ))}
  </div>
);

}

export { Tabs };
