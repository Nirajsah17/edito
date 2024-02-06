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
    const name = e.target.dataset.name;
    const index = tabList.indexOf(name);
    if (index > -1) {
      tabList.splice(index, 1);
    }
    setTabList([...tabList]);
  };

  return (
    <div
      className="w-full flex absolute top-0 left-0 z-10 overflow-x-auto whitespace-no-wrap scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin text-gray-500"
      key={"tabs"}
    >
      {tabList.map((tab) => (
        <div key={tab}>
          {activeTab === tab ? (
            <div
              className="flex hover:bg-gray-100 cursor-pointer bg-gray-100 flex-shrink-0"
              key={`${tab}-active`}
            ></div>
          ) : (
            <div
              className="flex hover:bg-gray-100 cursor-pointer bg-gray-300 flex-shrink-0"
              key={`${tab}-inactive`}
            ></div>
          )}

          <div
            className="p-0.5 border flex hover:bg-gray-100 cursor-pointer"
            key={`${tab}-content`}
          >
            <div className="p-1" key={`${tab}-split`}>
              {symbol[tab.split(".").pop()]}
            </div>
            <div className="p-1" key={`${tab}-name`}>
              {tab}
            </div>
            <div className=" p-1 text-xs text-green-400" key={`${tab}-dot`}>
              .
            </div>
            <div
              className="p-1 pl-2 pr-2 hover:rounded hover:bg-gray-200 cursor-pointer"
              key={`${tab}-close`}
              data-name={tab}
              onClick={handleDeleteTab}
            >
              ⨯
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Tabs };
