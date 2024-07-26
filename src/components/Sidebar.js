import folder from "./images/folder.svg";
import file from "./images/file.svg";
import Folder from "./Folder";
import File from "./File";
import Menu from "./Menu";
import { useState, useContext } from "react";
import FileContext from "../lib/FileContext";

export default function SideBar() {
  const handleMenu = () => {};
  const onFolderCreate = () => {};
  const onFileCreate = () => {};
  const eventHandler = () => {};

  return (
    <div
      onClick={handleMenu}
      className="flex flex-col w-60 h-full border-r items-center text-fg-default"
    >
      <div className="flex w-full h-9 border-b justify-between items-center">
        <div className="p-2 truncate ">
          <b>Home</b>
        </div>
        <div className="flex">
          <div className="p-2">
            <img
              onClick={onFolderCreate}
              className="cursor-pointer hover:rounded-md"
              src={folder}
              height={24}
              width={24}
            ></img>
          </div>
          <div className="p-2">
            <img
              onClick={onFileCreate}
              className="cursor-pointer  hover:rounded-md"
              src={file}
              height={24}
              width={24}
            ></img>
          </div>
        </div>
      </div>
      <div
        onClick={eventHandler}
        onContextMenu={eventHandler}
        className="w-full overflow-y-auto"
      >
        {/* {dir.map(renderNode)} */}
      </div>
    </div>
  );
}
