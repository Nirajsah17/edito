import { useEffect, useState } from "react";
import symbol from "../data/symbol.json";
import { tab } from "@testing-library/user-event/dist/tab";

function Tabs({ activeFileObj }) {
  const [activeTab, setActiveTab] = useState("");
  // Check the active file is present in the tbs list if not add them here set to active
  // perform CRUD operation on tabs
  // show the result based on file info
  const _tabs = ["edito.txt"];

  // const [allTabs,setAllTabs] = useState([]);
  const [tabList, setTabList] = useState(_tabs);

  useEffect(() => {
    if (!activeFileObj.name) return;
    if (activeFileObj) {
      if (!tabList.includes(activeFileObj.name)) {
        tabList.push(activeFileObj.name);
        setTabList(tabList);
      }
      setActiveTab(activeFileObj.name);
      setTabList([...tabList]);
    }
  }, [activeFileObj]);

  const handleDeleteTab = (e) => {
    console.log(e.target);
    const name = e.target.dataset.name;
    const index = tabList.indexOf(name);
    if (index > -1) {
      tabList.splice(index, 1);
    }
    setTabList([...tabList]);
  };

  return (
    <div
      className="w-full flex top-0 left-0 z-10 overflow-x-auto whitespace-no-wrap scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin text-gray-500"
      key={"tabs"}
    >
    {tabList.map((tab) => (
      <div key={tab} className="p-1 border-r-2">
        <span className="p-0.5">{tab}</span>
        <span>
          <button 
          key={`${tab}-close`}
          data-name={tab}
          onClick={handleDeleteTab}
          type="button" className="end-2.5 ms-auto inline-flex h-5 w-5 items-center justify-center rounded bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path></svg><span className="sr-only">Close modal</span>
          </button>
        </span>
      </div>
    ))}
  </div>
  );
}

export { Tabs };
