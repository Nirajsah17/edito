export default function LeftSideBar(props) {
  return (
    props.isOpen ? 
    <div className="flex flex-col bg-gray-50 w-72 h-full border-r items-center">
    <div className="" id="profile-card"></div>
    <div>Project</div>
    <div>Trash</div>
  </div> : ''
  )
}