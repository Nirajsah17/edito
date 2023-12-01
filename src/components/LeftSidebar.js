import folder from './images/folder.svg';
import file from './images/file.svg';

export default function LeftSideBar(props) {
  return (
    props.isOpen ? 
    <div className="flex flex-col bg-gray-50 w-72 h-full border-r items-center">
      <div className="flex w-full bg-gray-100 h-9 border-b justify-between items-center">
        <div className="p-2 truncate"><b><u>Foldern</u></b></div>
        <div className="flex">
          <div className="p-2">
          <img className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={folder} height={24} width={24}></img>
          </div>
          <div className="p-2">
            <img className='cursor-pointer hover:bg-gray-300 hover:rounded-md' src={file} height={24} width={24}></img>
          </div>
        </div>
      </div>
  </div> : ''
  )
}