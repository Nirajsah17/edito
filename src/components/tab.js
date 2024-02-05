import { useState } from "react";
import symbol from "../data/symbol.json";

function Tabs(activeFile) {
  const [activeTab, setActiveTab] = useState("");
  // Check the active file is present in the tbs list if not add them here set to active
  // perform CRUD operation on tabs
  // show the result based on file info
  const _tabs = [
    { name: "index.js" },
    { name: "App.js" },
    { name: "style.css" },
    { name: "package.json" },
    { name: "discusssion.md" },
    { name: "discusssion2.md" },
    { name: "discusssion3.md" },
    { name: "discusssion4.md" },
    { name: "discusssion5.md" },
    { name: "discusssion6.md" },
  ];

  const [tabList, setTabList] = useState(_tabs);

  return (
    <div
      className="w-full flex absolute top-0 left-0 z-10 overflow-x-auto whitespace-no-wrap scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-thumb-rounded-md scrollbar-thin text-gray-500"
      key={"tabs"}
    >
      {tabList.map((tab) => (
        <div key={tab.name}>
          {activeTab.name === tab.name ? (
            <div
              className="flex hover:bg-gray-100 cursor-pointer bg-gray-200 flex-shrink-0"
              key={`${tab.name}-active`}
            ></div>
          ) : (
            <div
              className="flex hover:bg-gray-100 cursor-pointer flex-shrink-0"
              key={`${tab.name}-inactive`}
            ></div>
          )}
          <div
            className="p-0.5 border flex hover:bg-gray-100 cursor-pointer"
            key={`${tab.name}-content`}
          >
            <div className="p-1" key={`${tab.name}-split`}>
              {symbol[tab.name.split(".").pop()]}
            </div>
            <div className="p-1" key={`${tab.name}-name`}>
              {tab.name}
            </div>
            <div
              className=" p-1 text-xs text-green-400"
              key={`${tab.name}-dot`}
            >
              .
            </div>
            <div
              className="p-1 pl-2 pr-2 hover:rounded hover:bg-gray-200 cursor-pointer"
              key={`${tab.name}-close`}
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
