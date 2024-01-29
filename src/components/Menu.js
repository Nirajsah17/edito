function Menu({ position, onMenuItemClick }) {
  // const handleNewFile = () => {
  //   console.log("handleNewFile");
  //   createFileOrFolder({ action: "create", type: 'file' })
  // }

  // const handleNewFolder = () => {
  //   console.log("handleNewFolder");
  //   createFileOrFolder({ action: "create", type: 'folder' })
  // }

  // const handleCut = (e) => {
  //   console.log("handleCut");
  // }

  // const handleCopy = (e) => {
  //   console.log("handleCopy");
  
  // }

  // const handleRename = (e) => {
  //   console.log("handleRename");
  //   createFileOrFolder({ action: "rename", type: 'folder' })
  // }

  // const handleDelete = (e) => {
  //   console.log("handleDelete");
  //   createFileOrFolder({ action: "delete" })
  // }
  
  return (
    <>
      <div className="m-2 bg-gray-50 shadow-md flex w-48 cursor-pointer flex-col border-l border-r border-t text-gray-500 absolute z-20"
      style={{ top: position.y, left: position.x }} onClick={onMenuItemClick}>
        <div id="newFile" className="border-b p-1 hover:bg-gray-100" >New File</div>
        <div id="newFolder" className="border-b p-1 hover:bg-gray-100" >New Folder</div>
        <div id="cut" className="border-b p-1 hover:bg-gray-100" >Cut</div>
        <div id="copy" className="border-b p-1 hover:bg-gray-100" >Copy</div>
        <div id="rename" className="border-b p-1 hover:bg-gray-100" >Rename</div>
        <div id="delete" className="border-b p-1 hover:bg-gray-100" >Delete</div>
      </div>
    
    </>
  )
}

export default Menu;
export { Menu }