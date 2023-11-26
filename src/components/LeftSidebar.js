export default function LeftSideBar(props) {
  console.log(props.isOpen);
  return (
    props.isOpen ? <div className="flex flex-col w-72 h-screen justify-between border border-blue-500 items-center">
    <div className="" id="profile-card"></div>
    <div>Project</div>
    <div>Trash</div>
  </div> : ''
  )
}