export default function LeftSideBar(props) {
  return (
    props.isOpen ? 
    <div className="flex flex-col w-72 h-full border-r items-center">
    <div className="" id="profile-card"></div>
    <div>Project</div>
    <div>Trash</div>
  </div> : ''
  )
}