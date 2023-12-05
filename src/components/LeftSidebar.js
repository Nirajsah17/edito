import folder from './images/folder.svg';
import file from './images/file.svg';
import Folder from './Folder';
import File from './File';

export default function LeftSideBar({data, isOpen, onFolderCreate, onFileCreate}) {
 const renderNode = (node) => {
    if (node.type === 'folder') {
      return (
        <Folder key={node.name} name={node.name}>
          {node.children.map(renderNode)}
        </Folder>
      );
    } else if (node.type === 'file') {
      return <File key={node.name} name={node.name} />;
    }
    return null;
  };
  
  return (
    isOpen ?
      <div className="flex flex-col bg-gray-50 w-72 h-full border-r items-center">
        <div className="flex w-full bg-gray-100 h-9 border-b justify-between items-center">
          <div className="p-2 truncate"><b><u>Folder</u></b></div>
          <div className="flex">
            <div className="p-2">
              <img onClick={onFolderCreate} className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={folder} height={24} width={24}></img>
            </div>
            <div className="p-2">
              <img onClick={onFileCreate} className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={file} height={24} width={24}></img>
            </div>
          </div>
        </div>
          <div className="w-full overflow-y-auto">{data.map(renderNode)}</div>
      </div> : ''
  )
}