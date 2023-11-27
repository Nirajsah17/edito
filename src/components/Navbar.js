
export default function Navbar({onToggleLeftSidebar}) {
  return (
    <div className="flex flex-row  w-full h-16 justify-between border-b items-center transition duration-700 ease-in-out" >
      <div className="flex flex-row" id="left">
        <div className="p-2 hover:bg-slate-200 cursor-pointer rounded-sm" onClick={onToggleLeftSidebar}>
          <svg  className="fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <div className="">Logo</div>
      </div>
      <div className="">Navigation</div>
      <div>Info</div>
    </div>
  )
}